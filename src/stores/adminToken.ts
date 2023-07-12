import { atom } from 'recoil';

import { localstorageEffect } from './localstorageEffect';

export const adminTokenState = atom({
  key: 'adminToken',
  default: undefined,
  effects: [localstorageEffect<string | undefined>('adminToken')],
});
