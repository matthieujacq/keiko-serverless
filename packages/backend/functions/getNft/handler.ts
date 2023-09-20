import { NFTEntity } from 'libs/dynamodb-toolbox/nftEntity';

// GetNft
export const main = async (event: any): Promise<any> => {
  const { userId } = event.pathParameters;
  const { Items = [] } = await NFTEntity.query(`Nft#${userId}`);

  return Items.map(({ id, positionX, positionY, imageIndex }) => ({
    id,
    positionX,
    positionY,
    imageIndex,
  }));
};
