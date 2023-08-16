import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';

import { ValidCreateMeetingState } from '../stores/createMeeting';
import { api } from './instance';
import { CreateMeetingRequest, Meeting, MeetingResponse } from './types';
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

const meetingResponseToState = (state: MeetingResponse): Meeting => {
  return {
    ...state,
    dates: state.dates.map((date) => dayjs(date)),
  };
};

export const createMeeting = async (meeting: ValidCreateMeetingState, setPassword: boolean) => {
  const meetingRequest = meetingStateToRequest(meeting, setPassword);

  const response: AxiosResponse<MeetingResponse> = await api.post('/meetings', meetingRequest);

  return response.data;
};

export const getMeeting = async (meetingId: string): Promise<Meeting> => {
  const response: AxiosResponse<MeetingResponse> = await api.get(`/meetings/${meetingId}`);

  const meeting = meetingResponseToState(response.data);

  return meeting;
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

export const issuePrivateMeetingAdminToken = async (meetingId: string, password: string) => {
  const response: AxiosResponse<{ token: string }> = await api.post(`/meetings/${meetingId}/auth`, {
    password,
  });

  return response.data.token;
};

export const issuePublicMeetingAdminToken = async (meetingId: string) => {
  const response: AxiosResponse<{ token: string }> = await api.post(`/meetings/${meetingId}/auth`);

  return response.data.token;
};
