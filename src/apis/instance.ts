import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});