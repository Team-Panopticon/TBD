import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let initialized = false;

export const initializeProgressInterceptor = (setShowProgress: (showProgress: boolean) => void) => {
  if (initialized) {
    return;
  }

  api.interceptors.request.use((config) => {
    setShowProgress(true);

    return config;
  });

  api.interceptors.response.use(
    (response) => {
      setShowProgress(false);

      return response;
    },
    (error) => {
      setShowProgress(false);

      return Promise.reject(error);
    },
  );

  initialized = true;
};
