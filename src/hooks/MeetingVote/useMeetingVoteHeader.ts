import { useRecoilValue } from 'recoil';

import { currentUserStateFamily } from '../../stores/currentUser';
import { useMeeting } from '../useMeeting';

export const useMeetingVoteHeader = () => {
  const { meeting, meetingId } = useMeeting();
  const currentUser = useRecoilValue(currentUserStateFamily(meetingId));

  return {
    meeting,
    currentUser,
  };
};
