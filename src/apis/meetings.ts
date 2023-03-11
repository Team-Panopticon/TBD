import { AxiosResponse } from 'axios';

import { CreateMeetingState } from '../stores/createMeeting';
import { api } from './instance';
import { CreateMeetingRequest, CreateMeetingResponse } from './types';

const meetingStateToRequest = (state: Required<CreateMeetingState>): CreateMeetingRequest => {
  return {
    ...state,
    dates: state.dates.map((date) => date.toISOString()),
    deadline: state.deadline.toISOString(),
  };
};

export const createMeeting = async (meeting: Required<CreateMeetingState>) => {
  const meetingRequest = meetingStateToRequest(meeting);

  const response: AxiosResponse<CreateMeetingResponse> = await api.post(
    '/meetings',
    meetingRequest,
  );

  return response.data;
};
