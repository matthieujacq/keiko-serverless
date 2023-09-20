import { getHandlerPath } from 'libs/configHelper/getHandlerPath';
import { nftTableDynamoDBReadPolicies } from 'resources/policies';

export const getUser = {
  handler: getHandlerPath(__dirname),
  iamRoleStatements: [nftTableDynamoDBReadPolicies],
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/users/{id}',
      },
    },
  ],
};
