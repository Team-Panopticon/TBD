import { atom } from 'recoil';

import { localStorageEffect } from './localstorageEffect';

interface IUser {
  id: number;
  name: string;
}
export const currentUserState = atom({
  key: 'CurrentUserID',
  default: { id: 0, name: '' },
  effects: [localStorageEffect<IUser>('current_user')],
});
