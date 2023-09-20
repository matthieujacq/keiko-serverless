import { NFTEntity } from 'libs/dynamodb-toolbox/nftEntity';
import { UserEntity } from 'libs/dynamodb-toolbox/userEntity';
import { getNFTPrice } from 'utils';

// DeleteNft
export const main = async (event: { pathParameters: any }) => {
  console.log('📆 event delete nft', event);
  const { userId, id } = event.pathParameters;

  await NFTEntity.delete({ PK: `Nft#${userId}`, id });
  const { Item: user } = await UserEntity.get({
    PK: `User#${userId}`,
    id: userId,
  });
  // const { score } = user; // QUESTION: how to make it work?
  const price = getNFTPrice();
  const score = (user?.score || 0) + price;
  await UserEntity.update({
    PK: `User#${userId}`,
    id: userId,
    score,
  });
  return { price };
};
