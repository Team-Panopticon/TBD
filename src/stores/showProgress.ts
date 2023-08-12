import { atom } from 'recoil';

export const showProgressState = atom<boolean>({
  key: 'showProgress',
  default: false,
});
