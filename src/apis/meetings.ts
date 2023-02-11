import axios, { AxiosResponse } from 'axios';
import { CreateMeetingRequest, CreateMeetingResponse } from './types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createMeeting = async (meeting: CreateMeetingRequest) => {
  const response: AxiosResponse<CreateMeetingResponse> = await api.post('/meetings', meeting);

  return response.data;
};
