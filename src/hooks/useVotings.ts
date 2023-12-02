import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getVotings } from '../apis/votes';

interface MeetingViewPathParams {
  meetingId: string;
}

export const VOTINGS_QUERY_KEY = 'VOTINGS_QUERY_KEY';

export const useVotings = () => {
  const { meetingId } = useParams<keyof MeetingViewPathParams>() as MeetingViewPathParams;
  const queryClient = useQueryClient();

  const {
    data: votings,
    isFetching,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['votings', meetingId],
    queryFn: () => getVotings(meetingId),
    retryOnMount: false,
  });

  return {
    votings,
    meetingId,
    isFetching,
    isLoading,
    isError,
    invalidate: () => queryClient.invalidateQueries({ queryKey: [VOTINGS_QUERY_KEY, meetingId] }),
  };
};