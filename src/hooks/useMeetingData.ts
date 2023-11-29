import { useQuery } from '@tanstack/react-query';

import { getMeeting } from '../apis/meetings';
import { getVotings } from '../apis/votes';

export const useMeetingData = (meetingId: string) => {
  const { data: meeting, isFetching: isMeetingFetching } = useQuery({
    queryKey: ['meeting', meetingId],
    queryFn: () => getMeeting(meetingId),
  });
  const { data: votings, isFetching: isVotingsFetching } = useQuery({
    queryKey: ['votings', meetingId],
    queryFn: () => getVotings(meetingId),
  });

  return {
    data: {
      meeting,
      votings,
    },
    isFetching: isMeetingFetching && isVotingsFetching,
  };
};
