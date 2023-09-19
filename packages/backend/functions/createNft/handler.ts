import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import crypto from 'crypto';

const randomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const client = new DynamoDBClient({ region: 'eu-west-1' });

export const main = async (event: any) => {
  console.log('📆 event create nft', event);

  const id = crypto.randomUUID();
  const positionX = randomIntFromInterval(5, 90).toString();
  const positionY = randomIntFromInterval(10, 90).toString();
  const imageIndex = Math.floor(Math.random() * 5).toString();

  const Item = {
    PK: { S: 'Nft' }, // Partition key, S for string
    SK: { S: id },
    id: { S: id },
    positionX: { N: positionX }, // N for number
    positionY: { N: positionY }, // QUESTION: why do we need to convert to string ?
    imageIndex: { N: imageIndex },
  };

  // QUESTION: for some reason if I don't use await here, the item is created but our lambda does not return data ({ id, positionX, positionY, imageIndex }})
  await client.send(
    new PutItemCommand({ TableName: process.env.NFT_TABLE_NAME, Item }),
  );

  return { id, positionX, positionY, imageIndex };
};
