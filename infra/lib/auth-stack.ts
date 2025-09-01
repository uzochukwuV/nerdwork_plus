import { Stack, StackProps, aws_lambda as lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';
import * as cdk from 'aws-cdk-lib';

export class AuthStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Lambda function definition
    const authLambda = new lambda.Function(this, 'AuthHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../functions/auth')),
      memorySize: 128,
      timeout: cdk.Duration.seconds(10),
      description: 'Handles basic auth logic (MVP placeholder)!',
    });
  }
}
