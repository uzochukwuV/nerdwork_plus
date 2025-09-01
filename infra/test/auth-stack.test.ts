import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AuthStack } from '../lib/auth-stack';

test('AuthStack creates a Lambda function and IAM role', () => {
  const app = new cdk.App();
  const stack = new AuthStack(app, 'TestAuthStack');

  const template = Template.fromStack(stack);

  // Assert a Lambda function exists
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: 'nodejs18.x',
    Handler: 'handler.handler',
  });

  // Assert an IAM Role exists
  template.hasResourceProperties('AWS::IAM::Role', {
    AssumeRolePolicyDocument: {
      Statement: [
        {
          Action: 'sts:AssumeRole',
          Effect: 'Allow',
          Principal: {
            Service: 'lambda.amazonaws.com',
          },
        },
      ],
    },
  });
});
