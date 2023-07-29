import { AxiosResponse } from 'axios';

import { ValidCreateMeetingState } from '../stores/createMeeting';
import { api } from './instance';
import { CreateMeetingRequest, MeetingResponse } from './types';
import { VotingSlot } from './votes';

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

  const response: AxiosResponse<MeetingResponse> = await api.post('/meetings', meetingRequest);

  return response.data;
};

export const getMeeting = async (meetingId: string) => {
  const response: AxiosResponse<MeetingResponse> = await api.get(`/meetings/${meetingId}`);

  return response.data;
};

export const confirmMeeting = async (meetingId: string, slot: VotingSlot) => {
  const adminToken = localStorage.getItem('adminToken');
  if (!adminToken) {
    throw new Error('adminToken is not set');
  }

  await api.post(`/meetings/${meetingId}/confirm`, slot, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
};
