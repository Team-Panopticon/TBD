import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { getMeeting } from '../apis/meetings';
import { getVotings } from '../apis/votes';
import { currentMeetingStateSelector } from '../stores/currentMeeting';

export const useMeetingData = (meetingId: string) => {
  const { data: meeting, isLoading: isMeetingLoading } = useQuery({
    queryKey: ['meeting', meetingId],
    queryFn: () => getMeeting(meetingId),
  });
  const { data: votings, isLoading: isVotingsLoading } = useQuery({
    queryKey: ['votings', meetingId],
    queryFn: () => getVotings(meetingId),
  });

  const setCurrentMeetingState = useSetRecoilState(currentMeetingStateSelector);
  useEffect(() => {
    if (!meeting) {
      return;
    }
    setCurrentMeetingState(meeting);
  }, [meeting, setCurrentMeetingState]);
  return {
    data: {
      meeting,
      votings,
    },
    isLoading: isMeetingLoading && isVotingsLoading,
  };
};
