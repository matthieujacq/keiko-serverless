import { Entity } from 'dynamodb-toolbox';
import { PARTITION_KEY } from 'resources/dynamoDB';
import { nftTable } from './nftTable';

export const UserEntity = new Entity({
  name: 'USER',
  attributes: {
    [PARTITION_KEY]: { type: 'string', partitionKey: true, default: 'User' },
    id: { type: 'string', sortKey: true },
    name: { type: 'string', default: 'Anonymous' },
    score: { type: 'number', default: 0 },
  },
  table: nftTable,
} as const);
