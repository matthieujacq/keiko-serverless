import { Table } from 'dynamodb-toolbox';
import { PARTITION_KEY, SORT_KEY } from 'resources/dynamoDB';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const marshallOptions = { convertEmptyValues: false };
export const DocumentClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: 'eu-west-1' }),
  { marshallOptions },
);
// const DocumentClient = new DynamoDBClient({ region: 'eu-west-1' });

export const nftTable = new Table({
  name: process.env.NFT_TABLE_NAME ?? 'MISSING_NFT_TABLE_NAME',
  partitionKey: PARTITION_KEY, // 'PK'
  sortKey: SORT_KEY, // 'SK'
  DocumentClient,
});
