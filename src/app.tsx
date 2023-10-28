import { ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { createBrowserRouter, Navigate, redirect, RouterProvider } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { initializeProgressInterceptor } from './apis/instance';
import { Progress } from './components/Progress';
import { ProtectedAdminRoute } from './components/routes/ProtectedAdminRoute';
import { RedirectIfConfirmedRoute } from './components/routes/RedirectIfConfirmedRoute';
import { RedirectIfInProgressRoute } from './components/routes/RedirectIfInProgressRoute';
import { ShareDialog } from './components/ShareDialog/ShareDialog';
import { GlobalStyle } from './GlobalStyle';
import { MeetingConfirm } from './pages/MeetingConfirm';
import { MeetingCreate } from './pages/MeetingCreate';
import { MeetingModify } from './pages/MeetingModify';
import { MeetingResult } from './pages/MeetingResult';
import { MeetingView } from './pages/MeetingView';
import { MeetingVote } from './pages/MeetingVote';
import { showProgressState } from './stores/showProgress';
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
  const setShowProgress = useSetRecoilState(showProgressState);

  useEffect(() => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  }, []);

  /**
   * bundle이 로딩되고 html에서 그린 progress가 제거된 뒤, 첫 API 콜 때 progress가 다시 그려져 깜빡이는 현상이 없도록 useEffect 내에서 처리
   * (첫 API에 Progress가 적용되지 않음)
   *
   * - 첫 API에 Progress가 그려질 경우 >> html에 적용된 progress -> 흰 화면 -> 첫 API에 의한 progress -> 페이지
   * - 첫 API에 Progress가 안그려질 경우 >> html에 적용된 progress -> 흰 화면 -> 흰 화면 -> 페이지
   */
  useEffect(() => {
    initializeProgressInterceptor(setShowProgress);
  }, [setShowProgress]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
      <Progress />
      <ShareDialog />
    </ThemeProvider>
  );
}
