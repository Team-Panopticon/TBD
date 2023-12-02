import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getMeeting } from '../apis/meetings';
import { getVotings } from '../apis/votes';

interface MeetingViewPathParams {
  meetingId: string;
}

export const useMeetingData = () => {
  const { meetingId } = useParams<keyof MeetingViewPathParams>() as MeetingViewPathParams;

  const { data: meeting, isFetching: isMeetingFetching } = useQuery({
    queryKey: ['meeting', meetingId],
    queryFn: () => getMeeting(meetingId),
  });
  const { data: votings, isFetching: isVotingsFetching } = useQuery({
    queryKey: ['votings', meetingId],
    queryFn: () => getVotings(meetingId),
  });

  return {
    meeting,
    votings,
    meetingId,
    isFetching: isMeetingFetching && isVotingsFetching,
  };
};
