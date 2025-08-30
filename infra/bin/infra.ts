import * as cdk from 'aws-cdk-lib';
import { AuthStack } from '../lib/auth-stack';
import { BaseStack } from '../lib/base-stack';
import { BackendStack } from '../lib/backend-stack';

const app = new cdk.App();

// Create base infrastructure
const baseStack = new BaseStack(app, 'BaseStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});

// Create auth stack
new AuthStack(app, 'AuthStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});

// Create backend stack with dependencies
new BackendStack(app, 'BackendStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  },
  vpc: baseStack.vpc,
  databaseSecret: baseStack.databaseSecret,
  storageBucket: baseStack.storageBucket,
});