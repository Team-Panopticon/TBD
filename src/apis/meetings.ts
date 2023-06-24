import { AxiosResponse } from 'axios';

import { ValidCreateMeetingState } from '../stores/createMeeting';
import { api } from './instance';
import { CreateMeetingRequest, CreateMeetingResponse, GetMeetingResponse } from './types';

const meetingStateToRequest = (
  state: ValidCreateMeetingState,
  setPassword: boolean,
): CreateMeetingRequest => {
  return {
    ...state,
    password: setPassword ? state.password : undefined,
    dates: state.dates.map((date) => date.toISOString()),
  };
};

export const createMeeting = async (meeting: ValidCreateMeetingState, setPassword: boolean) => {
  const meetingRequest = meetingStateToRequest(meeting, setPassword);

  const response: AxiosResponse<CreateMeetingResponse> = await api.post(
    '/meetings',
    meetingRequest,
  );

  return response.data;
};

export const getMeeting = async (meetingId: string) => {
  const response: AxiosResponse<GetMeetingResponse> = await api.get(`/meetings/${meetingId}`);

  return response.data;
};
