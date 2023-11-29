import { useRecoilState } from 'recoil';

import { showProgressState } from '../stores/showProgress';

export const useProgress = () => {
  const [isShow, setShow] = useRecoilState(showProgressState);

  return {
    isShow,
    show: () => setShow(true),
    hide: () => setShow(false),
  };
};
