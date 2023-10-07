import { atomFamily } from 'recoil';

import { localstorageEffect } from './localstorageEffect';

export const adminTokenStateFamily = atomFamily<string | undefined, string>({
  key: 'adminToken',
  default: undefined,
  effects: (meetingId) => [
    localstorageEffect<string | undefined>(`meetings/${meetingId}/admin_token`),
  ],
});
