import { atomFamily } from 'recoil';

import { localstorageEffect } from './localstorageEffect';

export interface User {
  id: string;
  username: string;
}

export const currentUserStateFamily = atomFamily<User | undefined, string>({
  key: 'currentUser',
  default: undefined,
  effects: (meetingId) => [
    localstorageEffect<User | undefined>(`meetings/${meetingId}/current_user`),
  ],
});
