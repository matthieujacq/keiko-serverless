import crypto from 'crypto';
import { NFTEntity } from 'libs/dynamodb-toolbox/nftEntity';

const randomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// CreateNft
export const main = async (event: any) => {
  console.log('📆 event create nft', event);
  const { body } = event;
  const { userId } = JSON.parse(body);

  const id = crypto.randomUUID();
  const positionX = randomIntFromInterval(5, 90);
  const positionY = randomIntFromInterval(10, 90);
  const imageIndex = Math.floor(Math.random() * 5);

  const Item = { PK: `Nft#${userId}`, id, positionX, positionY, imageIndex };

  await NFTEntity.put(Item);

  return Item;
};
