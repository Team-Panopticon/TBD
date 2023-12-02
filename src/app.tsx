import { ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';
import { Suspense } from 'react';
import { createBrowserRouter, Navigate, redirect, RouterProvider } from 'react-router-dom';

import { Loading } from './components/Loading';
import { Progress } from './components/Progress';
import { ProtectedAdminRoute } from './components/routes/ProtectedAdminRoute';
import { RedirectIfConfirmedRoute } from './components/routes/RedirectIfConfirmedRoute';
import { RedirectIfInProgressRoute } from './components/routes/RedirectIfInProgressRoute';
import { ShareDialog } from './components/ShareDialog/ShareDialog';
import { GlobalStyle } from './GlobalStyle';
import MeetingConfirm from './pages/MeetingConfirm';
import MeetingCreate from './pages/MeetingCreate';
import MeetingModify from './pages/MeetingModify';
import MeetingResult from './pages/MeetingResult';
import MeetingView from './pages/MeetingView';
import MeetingVote from './pages/MeetingVote';
import { theme } from './theme';

dayjs.locale('ko');

const router = createBrowserRouter([
  {
    path: '*',
    element: <Navigate to={'/meetings/new'} />,
  },
  {
    path: '/',
    loader: () => redirect('/meetings/new'),
  },
  {
    path: 'meetings/new',
    element: <MeetingCreate />,
  },
  {
    path: 'meetings/:meetingId',
    element: <MeetingView />,
  },
  {
    path: 'meetings/:meetingId/vote',
    element: (
      <RedirectIfConfirmedRoute>
        <MeetingVote />
      </RedirectIfConfirmedRoute>
    ),
  },
  {
    path: 'meetings/:meetingId/modify',
    element: (
      <RedirectIfConfirmedRoute>
        <ProtectedAdminRoute>
          <MeetingModify />
        </ProtectedAdminRoute>
      </RedirectIfConfirmedRoute>
    ),
  },
  {
    path: 'meetings/:meetingId/result',
    element: (
      <RedirectIfInProgressRoute>
        <MeetingResult />
      </RedirectIfInProgressRoute>
    ),
  },
  {
    path: 'meetings/:meetingId/confirm',
    element: (
      <RedirectIfConfirmedRoute>
        <ProtectedAdminRoute>
          <MeetingConfirm />
        </ProtectedAdminRoute>
      </RedirectIfConfirmedRoute>
    ),
  },
]);

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
      <Progress />
      <ShareDialog />
    </ThemeProvider>
  );
}
