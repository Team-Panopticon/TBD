import { useRecoilValue } from 'recoil';

import { confiremdUserListSelector, missedUserListSelector } from '../stores/voting';

export const useMeetingResult = () => {
  const missedUserList = useRecoilValue(missedUserListSelector);
  const confirmedUserList = useRecoilValue(confiremdUserListSelector);

  return {
    confirmedUserList,
    missedUserList,
  };
};
