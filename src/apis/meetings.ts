import { AxiosResponse } from 'axios';

import { CreateMeetingState } from '../stores/createMeeting';
import { api } from './instance';
import { CreateMeetingRequest, CreateMeetingResponse } from './types';

const meetingStateToRequest = (
  state: CreateMeetingState,
  setPassword: boolean,
): CreateMeetingRequest => {
  return {
    ...state,
    password: setPassword ? state.password : undefined,
    dates: state.dates.map((date) => date.toISOString()),
  };
};

export const createMeeting = async (meeting: CreateMeetingState, setPassword: boolean) => {
  const meetingRequest = meetingStateToRequest(meeting, setPassword);

  const response: AxiosResponse<CreateMeetingResponse> = await api.post(
    '/meetings',
    meetingRequest,
  );

  return response.data;
};
