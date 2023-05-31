import { atom } from 'recoil';

import { localstorageEffect } from './localstorageEffect';

type IUser =
  | {
      id: number;
      name: string;
    }
  | undefined;
export const currentUserState = atom({
  key: 'currentUserID',
  default: undefined,
  effects: [localstorageEffect<IUser>('current_user')],
});
