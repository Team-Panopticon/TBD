import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { currentUserStateFamily } from '../../stores/currentUser';
import { useMeeting } from '../useMeeting';
import useShare from '../useShare';

export const useMeetingViewFooter = () => {
  const { meeting, meetingId } = useMeeting();
  const { openShare, setTarget } = useShare();
  const currentUser = useRecoilValue(currentUserStateFamily(meetingId));

  useEffect(() => {
    if (meeting) {
      setTarget(meeting);
    }
  }, [meeting, meetingId]);

  return {
    openShare,
    meeting,
    meetingId,
    currentUser,
  };
};
