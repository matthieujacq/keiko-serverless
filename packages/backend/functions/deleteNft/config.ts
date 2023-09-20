import { getHandlerPath } from 'libs/configHelper/getHandlerPath';
import {
  nftTableDynamoDBDeletePolicies,
  nftTableDynamoDBReadPolicies,
  nftTableDynamoDBUpdatePolicies,
} from 'resources/policies';

export const deleteNft = {
  handler: getHandlerPath(__dirname),
  iamRoleStatements: [
    nftTableDynamoDBDeletePolicies,
    nftTableDynamoDBReadPolicies,
    nftTableDynamoDBUpdatePolicies,
  ],
  events: [
    {
      httpApi: {
        method: 'delete',
        path: '/nfts/{userId}/{id}',
      },
    },
  ],
};
