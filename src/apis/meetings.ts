import { AxiosResponse } from 'axios';

import { ValidCreateMeetingState, CreateMeetingState } from '../stores/createMeeting';
import { api } from './instance';
import { CreateMeetingRequest, CreateMeetingResponse } from './types';

const meetingStateToRequest = (state: ValidCreateMeetingState, setPassword: boolean): CreateMeetingRequest => {
  return {
    ...state,
    password: setPassword ? state.password : undefined,
    dates: state.dates.map((date) => date.toISOString()),
    deadline: state.deadline.toISOString(),
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
