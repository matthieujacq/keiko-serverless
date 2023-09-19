import { NFTEntity } from 'libs/dynamodb-toolbox/nftEntity';

// DeleteNft
export const main = async (event: { pathParameters: any }) => {
  console.log('📆 event delete nft', event);
  const { userId, id } = event.pathParameters;

  await NFTEntity.delete({ PK: `Nft#${userId}`, id });
};
