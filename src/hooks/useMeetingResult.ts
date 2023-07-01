import { useRecoilValue } from 'recoil';

import { GetMeetingResponse } from '../apis/types';
import { confiremdUserListSelector, missedUserListSelector } from '../stores/voting';

export const useMeetingResult = (meeting?: GetMeetingResponse) => {
  const missedUserList = useRecoilValue(missedUserListSelector);
  const confirmedUserList = useRecoilValue(confiremdUserListSelector);

  return {
    confirmedUserList,
    missedUserList,
  };
};
