import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';

import { getMeeting } from '../apis/meetings';
import { MeetingStatus } from '../constants/meeting';

interface MeetingPathParams {
  meetingId: string;
}

interface RedirectIfConfirmedRouteProps {
  children: JSX.Element;
}

export function RedirectIfConfirmedRoute({ children }: RedirectIfConfirmedRouteProps) {
  const { meetingId } = useParams<keyof MeetingPathParams>() as MeetingPathParams;

  const { data: meeting } = useQuery({
    queryKey: ['meeting', meetingId],
    queryFn: () => getMeeting(meetingId),
  });

  if (meeting?.status === MeetingStatus.done) {
    return <Navigate to={`/meetings/${meetingId}/result`} replace />;
  }

  return children;
}
