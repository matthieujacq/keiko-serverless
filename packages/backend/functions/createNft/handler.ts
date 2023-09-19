import crypto from 'crypto';
import { NFTEntity } from 'libs/dynamodb-toolbox/nftEntity';

const randomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const main = async (event: any) => {
  console.log('📆 event create nft', event);

  const id = crypto.randomUUID();
  const positionX = randomIntFromInterval(5, 90);
  const positionY = randomIntFromInterval(10, 90);
  const imageIndex = Math.floor(Math.random() * 5);

  const Item = { id, positionX, positionY, imageIndex };

  await NFTEntity.put(Item);

  return Item;
};
