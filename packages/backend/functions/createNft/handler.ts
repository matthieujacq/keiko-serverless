import crypto from 'crypto';
import { get } from 'http';
import { NFTEntity } from 'libs/dynamodb-toolbox/nftEntity';
import { UserEntity } from 'libs/dynamodb-toolbox/userEntity';
import { getNFTPrice, randomIntFromInterval } from 'utils';

// CreateNft
export const main = async (event: any) => {
  console.log('📆 event create nft', event);
  const { body } = event;
  const { userId } = JSON.parse(body);

  const { Item: user } = await UserEntity.get({
    PK: `User#${userId}`,
    id: userId,
  });
  const price = getNFTPrice();
  const score = (user?.score || 0) - price;
  await UserEntity.update({
    PK: `User#${userId}`,
    id: userId,
    score,
  });

  const id = crypto.randomUUID();
  const positionX = randomIntFromInterval(5, 90);
  const positionY = randomIntFromInterval(10, 90);
  const imageIndex = Math.floor(Math.random() * 5);
  const Item = { PK: `Nft#${userId}`, id, positionX, positionY, imageIndex };

  await NFTEntity.put(Item);

  return { id, positionX, positionY, imageIndex, price };
};
