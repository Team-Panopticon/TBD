import { AxiosResponse } from 'axios';

import { api } from './instance';
import { CreateMeetingRequest, CreateMeetingResponse } from './types';

export const createMeeting = async (meeting: CreateMeetingRequest) => {
  const response: AxiosResponse<CreateMeetingResponse> = await api.post('/meetings', meeting);

  return response.data;
};
