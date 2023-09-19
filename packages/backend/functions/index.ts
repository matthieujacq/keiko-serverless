import { createNft } from './createNft/config';
import { createUser } from './createUser/config';
import { deleteNft } from './deleteNft/config';
import { getNft } from './getNft/config';
import { getUser } from './getUser/config';
import { logMessage } from './logMessage/config';

export const functions = {
  getNft,
  createNft,
  deleteNft,
  getUser,
  createUser,
  logMessage,
};
