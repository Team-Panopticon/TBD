import { useRecoilState } from 'recoil';

import { showShareDialog } from '../stores/showShareDialog';

const useShare = () => {
  const [show, setShow] = useRecoilState(showShareDialog);
  const openShare = () => setShow(true);
  const closeShare = () => setShow(false);

  return { closeShare, openShare, show };
};
export default useShare;
