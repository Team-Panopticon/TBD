import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getMeeting } from '../apis/meetings';

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
    staleTime: 5000,
  });

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
