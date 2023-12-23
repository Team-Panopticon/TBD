import { ThemeProvider } from '@mui/material/styles';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { Suspense, useEffect } from 'react';
import { createBrowserRouter, Navigate, redirect, RouterProvider } from 'react-router-dom';

import { Loading } from './components/Loading';
import { PageLayout } from './components/pageLayout';
import { Progress } from './components/Progress';
import { ProtectedAdminRoute } from './components/routes/ProtectedAdminRoute';
import { RedirectIfConfirmedRoute } from './components/routes/RedirectIfConfirmedRoute';
import { RedirectIfInProgressRoute } from './components/routes/RedirectIfInProgressRoute';
import { ShareDialog } from './components/ShareDialog/ShareDialog';
import { GlobalStyle } from './GlobalStyle';
import { useProgress } from './hooks/useProgress';
import MeetingConfirm from './pages/MeetingConfirm';
import MeetingCreate from './pages/MeetingCreate';
import MeetingModify from './pages/MeetingModify';
import MeetingResult from './pages/MeetingResult';
import MeetingView from './pages/MeetingView';
import MeetingVote from './pages/MeetingVote';
import Welcome from './pages/Welcome';
import { theme } from './theme';

dayjs.locale('ko');

const router = createBrowserRouter([
  {
    path: '*',
    element: <Navigate to={'/welcome'} />,
  },
  {
    path: '/',
    loader: () => redirect('/welcome'),
  },

  {
    element: <PageLayout useHeader={false} />,
    children: [
      {
        path: 'welcome',
        element: <Welcome />,
      },
      {
        path: 'meetings/new',
        element: <MeetingCreate />,
      },
    ],
  },

  {
    element: <PageLayout />,
    children: [
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
    ],
  },
]);

const DEFAULT_ERROR_MESSAGE = '알 수 없는 에러가 발생했습니다';

export function App() {
  const { show, hide } = useProgress();
  const queryClient = useQueryClient();

  const onError = (error: unknown) => {
    console.debug('QueryClient >> onError', error);
    if (error instanceof AxiosError) {
      const errorResponseData = error.response?.data as { message: string };
      const errorMessage = errorResponseData?.message || DEFAULT_ERROR_MESSAGE;
      alert(errorMessage);
    } else if (error instanceof Error) {
      const errorMessage = error?.message || DEFAULT_ERROR_MESSAGE;
      alert(errorMessage);
    }
  };
  const onMutate = () => show();
  const onSettled = () => hide();

  useEffect(() => {
    queryClient.setDefaultOptions({
      queries: {
        refetchOnWindowFocus: false,
      },
      mutations: {
        onError,
        onMutate,
        onSettled,
      },
    });
  }, [queryClient]);

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
