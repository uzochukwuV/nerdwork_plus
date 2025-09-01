import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { BaseStack } from '../lib/base-stack';

test('BaseStack contains VPC, S3 and Secret', () => {
  const app = new cdk.App();
  const stack = new BaseStack(app, 'TestStack');
  const template = Template.fromStack(stack);

  template.hasResource('AWS::EC2::VPC', {});
  template.hasResource('AWS::S3::Bucket', {});
  template.hasResource('AWS::SecretsManager::Secret', {});
});
