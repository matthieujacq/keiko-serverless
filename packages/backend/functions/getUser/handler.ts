import { UserEntity } from 'libs/dynamodb-toolbox/userEntity';

export const main = async (event: any) => {
  const { id } = event.pathParameters;
  const { Item: User } = await UserEntity.get({ id, PK: `User#${id}` });
  const score = User?.score;
  return { id, score };
};
