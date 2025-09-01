import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecr_assets from 'aws-cdk-lib/aws-ecr-assets';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as s3 from 'aws-cdk-lib/aws-s3';

interface BackendStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
  databaseSecret: secretsmanager.ISecret;
  storageBucket: s3.IBucket;
}

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: BackendStackProps) {
    super(scope, id, props);

    // 🔹 1. Create ECS Cluster
    const cluster = new ecs.Cluster(this, 'BackendCluster', {
      vpc: props.vpc,
      clusterName: 'nerdwork-backend-cluster',
      containerInsights: true,
    });

    // 🔹 2. Create ECR Repository for Backend Image
    const backendImage = new ecr_assets.DockerImageAsset(this, 'BackendImage', {
      directory: '../backend', // Path to your backend directory
      file: 'Dockerfile',
      buildArgs: {
        NODE_ENV: 'production',
      },
    });

    // 🔹 3. Create RDS Database (Aurora PostgreSQL)
    const database = new rds.DatabaseInstance(this, 'BackendDatabase', {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_15_4,
      }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      vpc: props.vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
      databaseName: 'nerdwork_db',
      credentials: rds.Credentials.fromSecret(props.databaseSecret),
      backupRetention: cdk.Duration.days(7),
      deletionProtection: false, // Set to true in production
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Set to RETAIN in production
    });

    // 🔹 4. Create Application Load Balancer
    const alb = new elbv2.ApplicationLoadBalancer(this, 'BackendALB', {
      vpc: props.vpc,
      internetFacing: true,
      loadBalancerName: 'nerdwork-backend-alb',
    });

    // 🔹 5. Create ECS Task Definition
    const taskDefinition = new ecs.FargateTaskDefinition(this, 'BackendTaskDef', {
      memoryLimitMiB: 512,
      cpu: 256,
      taskRole: new iam.Role(this, 'BackendTaskRole', {
        assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonECSTaskExecutionRolePolicy'),
        ],
        inlinePolicies: {
          S3Access: new iam.PolicyDocument({
            statements: [
              new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                actions: ['s3:GetObject', 's3:PutObject', 's3:DeleteObject'],
                resources: [props.storageBucket.arnForObjects('*')],
              }),
            ],
          }),
        },
      }),
      executionRole: new iam.Role(this, 'BackendExecutionRole', {
        assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonECSTaskExecutionRolePolicy'),
        ],
      }),
    });

    // 🔹 6. Add Container to Task Definition
    const container = taskDefinition.addContainer('BackendContainer', {
      image: ecs.ContainerImage.fromDockerImageAsset(backendImage),
      containerName: 'nerdwork-backend',
      logging: ecs.LogDrivers.awsLogs({
        streamPrefix: 'backend',
        logRetention: logs.RetentionDays.ONE_WEEK,
      }),
      environment: {
        NODE_ENV: 'production',
        PORT: '5000',
        DATABASE_URL: `postgresql://${props.databaseSecret.secretValueFromJson('username')}:${props.databaseSecret.secretValueFromJson('password')}@${database.instanceEndpoint.hostname}:${database.instanceEndpoint.port}/nerdwork_db`,
        JWT_SECRET: 'your-jwt-secret-here', // Use Secrets Manager in production
        S3_BUCKET_NAME: props.storageBucket.bucketName,
      },
      secrets: {
        DATABASE_PASSWORD: ecs.Secret.fromSecretsManager(props.databaseSecret, 'password'),
      },
      portMappings: [
        {
          containerPort: 5000,
          protocol: ecs.Protocol.TCP,
        },
      ],
      healthCheck: {
        command: ['CMD-SHELL', 'curl -f http://localhost:5000/health || exit 1'],
        interval: cdk.Duration.seconds(30),
        timeout: cdk.Duration.seconds(5),
        retries: 3,
        startPeriod: cdk.Duration.seconds(60),
      },
    });

    // 🔹 7. Create ECS Service
    const service = new ecs.FargateService(this, 'BackendService', {
      cluster,
      taskDefinition,
      serviceName: 'nerdwork-backend-service',
      desiredCount: 1,
      assignPublicIp: false,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
      securityGroups: [
        new ec2.SecurityGroup(this, 'BackendSecurityGroup', {
          vpc: props.vpc,
          description: 'Security group for Nerdwork backend service',
          allowAllOutbound: true,
        }),
      ],
    });

    // 🔹 8. Add Target Group and Listener
    const targetGroup = new elbv2.ApplicationTargetGroup(this, 'BackendTargetGroup', {
      vpc: props.vpc,
      port: 5000,
      protocol: elbv2.ApplicationProtocol.HTTP,
      targetType: elbv2.TargetType.IP,
      healthCheck: {
        path: '/health',
        healthyHttpCodes: '200',
        interval: cdk.Duration.seconds(30),
        timeout: cdk.Duration.seconds(5),
        healthyThresholdCount: 2,
        unhealthyThresholdCount: 3,
      },
    });

    targetGroup.addTarget(service);

    const listener = alb.addListener('BackendListener', {
      port: 80,
      protocol: elbv2.ApplicationProtocol.HTTP,
      defaultTargetGroups: [targetGroup],
    });

    // 🔹 9. Allow ECS Service to Access Database
    database.connections.allowFrom(service, ec2.Port.tcp(5432), 'Allow ECS service to access RDS');

    // 🔹 10. Outputs
    new cdk.CfnOutput(this, 'BackendServiceURL', {
      value: `http://${alb.loadBalancerDnsName}`,
      description: 'URL of the backend service',
    });

    new cdk.CfnOutput(this, 'BackendClusterName', {
      value: cluster.clusterName,
      description: 'Name of the ECS cluster',
    });

    new cdk.CfnOutput(this, 'BackendServiceName', {
      value: service.serviceName,
      description: 'Name of the ECS service',
    });
  }
}
