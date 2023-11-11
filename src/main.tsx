import '../index.css';
import 'dayjs/locale/ko';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import { App } from './app';

if (process.env.NODE_ENV === 'development' && import.meta.env.VITE_USE_MSW) {
  const { worker } = await import('./mocks/browser');
  worker.start();
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// https://github.com/facebook/react/issues/19841#issuecomment-694978234
// iOS에서 빠르게 근처를 두번 클릭 시 더블클릭 이벤트로 간주되어 처음 클릭한 곳이 두번 클릭되는 이슈를 해결
// eslint-disable-next-line @typescript-eslint/unbound-method
const oldAddEventListener = Node.prototype.addEventListener;
Node.prototype.addEventListener = function (type, ...args) {
  if (type === 'dblclick') {
    // ignore
    return;
  }
  return oldAddEventListener.call(this, type, ...args);
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </RecoilRoot>,
  // </React.StrictMode>,
);
