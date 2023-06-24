import { atom } from 'recoil';

import { localstorageEffect } from './localstorageEffect';

export interface User {
  id: string;
  username: string;
}

export const currentUserState = atom({
  key: 'currentUser',
  default: undefined,
  effects: [localstorageEffect<User | undefined>('current_user')],
});
