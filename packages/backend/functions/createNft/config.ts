import { getHandlerPath } from 'libs/configHelper/getHandlerPath';
import {
  nftTableDynamoDBReadPolicies,
  nftTableDynamoDBUpdatePolicies,
  nftTableDynamoDBWritePolicies,
} from 'resources/policies';

export const createNft = {
  handler: getHandlerPath(__dirname),
  iamRoleStatements: [
    nftTableDynamoDBWritePolicies,
    nftTableDynamoDBReadPolicies,
    nftTableDynamoDBUpdatePolicies,
  ],
  events: [
    {
      httpApi: {
        method: 'post',
        path: '/nfts',
      },
    },
  ],
};
