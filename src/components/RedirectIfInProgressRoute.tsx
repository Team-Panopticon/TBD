import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';

import { getMeeting } from '../apis/meetings';
import { MeetingStatus } from '../constants/meeting';

interface MeetingPathParams {
  meetingId: string;
}

interface RedirectIfInProgressRouteProps {
  children: JSX.Element;
}

export function RedirectIfInProgressRoute({ children }: RedirectIfInProgressRouteProps) {
  const { meetingId } = useParams<keyof MeetingPathParams>() as MeetingPathParams;

  const { data: meeting } = useQuery({
    queryKey: ['meeting', meetingId],
    queryFn: () => getMeeting(meetingId),
  });

  if (meeting?.status === MeetingStatus.inProgress) {
    return <Navigate to={`/meetings/${meetingId}`} replace />;
  }

  return children;
}
