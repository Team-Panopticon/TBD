import { atom } from 'recoil';

import { localstorageEffect } from './localstorageEffect';

export interface User {
  id: string;
  username: string;
}

export const currentUserStateOf = (meetingId: string) =>
  atom({
    key: 'currentUser',
    default: undefined,
    effects: [localstorageEffect<User | undefined>(`meetings/${meetingId}/current_user`)],
  });
