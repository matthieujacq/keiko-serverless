import {
  DynamoDBClient,
  PutItemCommand,
  UpdateTableCommand,
} from '@aws-sdk/client-dynamodb';
import crypto from 'crypto';

const randomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const client = new DynamoDBClient({ region: 'eu-west-1' });

export const main = (event: any) => {
  console.log('📆 event create nft', event);

  const id = crypto.randomUUID();

  const Item = {
    PK: { S: 'Nft' }, // Partition key, S for string
    SK: { S: id },
    id: { S: id },
    positionX: { N: randomIntFromInterval(5, 90).toString() }, // N for number
    positionY: { N: randomIntFromInterval(10, 90).toString() }, // QUESTION: why do we need to convert to string ?
    imageIndex: { N: Math.floor(Math.random() * 5).toString() },
  };

  client.send(
    new PutItemCommand({ TableName: process.env.NFT_TABLE_NAME, Item }),
  );

  const { positionX, positionY, imageIndex } = Item;
  return { id, positionX, positionY, imageIndex };
};
