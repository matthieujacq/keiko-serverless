import * as crypto from 'crypto';
import { UserEntity } from 'libs/dynamodb-toolbox/userEntity';

export const main = async () => {
  const id = crypto.randomUUID();

  const user = await UserEntity.put({ id, PK: `User#${id}` });
  console.debug('🪪 user created', user);

  return { id };
};
