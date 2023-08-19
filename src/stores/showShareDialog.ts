import { atom } from 'recoil';

export const showShareDialog = atom<boolean>({
  key: 'showShareDialog',
  default: false,
});
