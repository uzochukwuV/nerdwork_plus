import * as cdk from 'aws-cdk-lib';
import { AuthStack } from '../lib/auth-stack';
import { BaseStack } from '../lib/base-stack';

const app = new cdk.App();

new BaseStack(app, 'BaseStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
})

new AuthStack(app, 'AuthStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});