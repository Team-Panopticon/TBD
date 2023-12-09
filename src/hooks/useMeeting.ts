import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { getMeeting } from '../apis/meetings';
import { currentMeetingStateSelector } from '../stores/currentMeeting';

interface MeetingViewPathParams {
  meetingId: string;
}

export const MEETING_QUERY_KEY = 'MEETING_QUERY_KEY';

export const useMeeting = () => {
  const { meetingId } = useParams<keyof MeetingViewPathParams>() as MeetingViewPathParams;
  const queryClient = useQueryClient();

  const {
    data: meeting,
    isFetching,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [MEETING_QUERY_KEY, meetingId],
    queryFn: () => getMeeting(meetingId),
    refetchOnMount: true,
    staleTime: 5000,
  });

  const setCurrentMeetingState = useSetRecoilState(currentMeetingStateSelector);
  useEffect(() => {
    if (!meeting) {
      return;
    }
    setCurrentMeetingState(meeting);
  }, [meeting, setCurrentMeetingState]);

  return {
    meeting,
    meetingId,
    isFetching,
    isLoading,
    isError,
    invalidateMeeting: () =>
      queryClient.invalidateQueries({ queryKey: [MEETING_QUERY_KEY, meetingId] }),
  };
};
