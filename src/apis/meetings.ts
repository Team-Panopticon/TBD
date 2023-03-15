import { AxiosResponse } from 'axios';

import { ValidCreateMeetingState } from '../stores/createMeeting';
import { api } from './instance';
import { CreateMeetingRequest, CreateMeetingResponse } from './types';

const meetingStateToRequest = (state: ValidCreateMeetingState): CreateMeetingRequest => {
  return {
    ...state,
    dates: state.dates.map((date) => date.toISOString()),
    deadline: state.deadline.toISOString(),
  };
};

export const createMeeting = async (meeting: ValidCreateMeetingState) => {
  const meetingRequest = meetingStateToRequest(meeting);

  const response: AxiosResponse<CreateMeetingResponse> = await api.post(
    '/meetings',
    meetingRequest,
  );

  return response.data;
};
