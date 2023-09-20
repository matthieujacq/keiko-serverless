import { tableArn } from '..';

export const nftTableDynamoDBReadPolicies = {
  Effect: 'Allow',
  Resource: [tableArn],
  Action: ['dynamodb:GetItem', 'dynamodb:Query'],
};

export const nftTableDynamoDBWritePolicies = {
  Effect: 'Allow',
  Resource: [tableArn],
  Action: ['dynamodb:PutItem'],
};

export const nftTableDynamoDBDeletePolicies = {
  Effect: 'Allow',
  Resource: [tableArn],
  Action: ['dynamodb:DeleteItem'],
};

export const nftTableDynamoDBUpdatePolicies = {
  Effect: 'Allow',
  Resource: [tableArn],
  Action: ['dynamodb:UpdateItem'],
};
