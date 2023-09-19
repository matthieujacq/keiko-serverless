import { NFTEntity } from 'libs/dynamodb-toolbox/nftEntity';

export const main = async (event: { pathParameters: { id: string } }) => {
  console.log('📆 event delete nft', event);

  await NFTEntity.delete({ id: event.pathParameters.id });
};
