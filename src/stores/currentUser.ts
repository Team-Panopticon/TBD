import { atom } from 'recoil';

import { localstorageEffect } from './localstorageEffect';

interface IUser {
  id: number;
  name: string;
}
export const currentUserState = atom({
  key: 'CurrentUserID',
  default: { id: 0, name: '' },
  effects: [localstorageEffect<IUser>('current_user')],
});
