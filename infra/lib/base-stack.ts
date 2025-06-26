import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';

export class BaseStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // 🔹 1. VPC with 2 AZs
    const vpc = new ec2.Vpc(this, 'PlatformVPC', {
      maxAzs: 2,
      natGateways: 1,
    });

    // 🔹 2. S3 Bucket for comic uploads
    const storageBucket = new s3.Bucket(this, 'ComicMediaBucket', {
      versioned: true,
      removalPolicy: RemovalPolicy.DESTROY, // 🔥 change in prod
      autoDeleteObjects: true, // 🔥 change in prod
    });

    // 🔹 3. Secrets Manager for DB credentials or API keys
    const dbSecret = new secretsmanager.Secret(this, 'DatabaseSecret', {
      secretName: 'nerdwork-db-secret',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          username: 'nerdwork_admin',
        }),
        excludePunctuation: true,
        includeSpace: false,
        generateStringKey: 'password',
      },
    });

    // Output (optional for testing)
    this.exportValue(vpc.vpcId, { name: 'VPCId' });
    this.exportValue(storageBucket.bucketName, { name: 'S3ComicBucket' });
    this.exportValue(dbSecret.secretArn, { name: 'DBSecretArn' });
  }
}
