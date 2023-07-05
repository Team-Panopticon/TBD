import { Navigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { adminTokenState } from '../stores/adminToken';

interface ProtectedAdminRouteProps {
  children: JSX.Element;
}

export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { meetingId } = useParams<'meetingId'>();
  const adminToken = useRecoilValue(adminTokenState);
  const isLoggedInAsAdmin = adminToken !== undefined;

  if (!meetingId) {
    console.log('navigate to new meetings');
    return <Navigate to="/meetings/new" replace />;
  }

  if (!isLoggedInAsAdmin) {
    console.log('navigate to meetings view');
    return <Navigate to={`/meetings/${meetingId}`} replace />;
  }

  return children;
}
