import { atom } from 'recoil';

import { Meeting } from '../apis/types';

interface IShareData {
  show: boolean;
  target?: Meeting;
}

const defaultShareData: IShareData = {
  show: false,
  target: undefined,
};
export const shareData = atom<IShareData>({
  key: 'shareData',
  default: defaultShareData,
});
