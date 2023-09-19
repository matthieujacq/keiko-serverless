import { NFTEntity } from 'libs/dynamodb-toolbox/nftEntity';

export const main = async (): Promise<any> => {
  const { Items = [] } = await NFTEntity.query('Nft');

  return Items.map(({ id, positionX, positionY, imageIndex }) => ({
    id,
    positionX,
    positionY,
    imageIndex,
  }));
};
