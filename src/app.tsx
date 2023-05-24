import { ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { initializeProgressInterceptor } from './apis/instance';
import { Progress } from './components/Progress';
import { GlobalStyle } from './GlobalStyle';
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
    element: <MeetingVote />,
  },
  {
    path: 'meetings/:meetingId/modify',
    element: <MeetingModify />,
  },
  {
    path: 'meetings/:meetingId/result',
    element: <MeetingResult />,
  },
]);

export function App() {
  const setShowProgress = useSetRecoilState(showProgressState);

  useEffect(() => {
    initializeProgressInterceptor(setShowProgress);
  }, [setShowProgress]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
      <Progress />
    </ThemeProvider>
  );
}
