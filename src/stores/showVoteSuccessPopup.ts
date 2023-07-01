import { atom } from 'recoil';

export const showVoteSuccessPopupState = atom<boolean>({
  key: 'showVoteSuccessPopup',
  default: false,
});
