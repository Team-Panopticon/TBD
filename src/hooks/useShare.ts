import { useRecoilState } from 'recoil';

import { Meeting } from '../apis/types';
import { shareData as shareDataState } from '../stores/shareData';

const useShare = () => {
  const [shareData, setShareData] = useRecoilState(shareDataState);
  const show = shareData.show;
  const target = shareData.target;
  const openShare = () =>
    setShareData((prev) => {
      return { ...prev, show: true };
    });
  const closeShare = () =>
    setShareData((prev) => {
      return { ...prev, show: false };
    });

  const setTarget = (target: Meeting) =>
    setShareData((prev) => {
      return { ...prev, target };
    });

  return { closeShare, openShare, show, setTarget, target };
};
export default useShare;
