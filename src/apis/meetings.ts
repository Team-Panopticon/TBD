import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';

import { ValidCreateMeetingState } from '../stores/createMeeting';
import { getLocalStorageItem } from '../stores/localstorageEffect';
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
  const confirmedDateType: VotingSlot | undefined = state.confirmedDateType
    ? {
        date: dayjs(state.confirmedDateType.date),
        meal: state.confirmedDateType.meal,
      }
    : undefined;

  return {
    ...state,
    dates: state.dates.map((date) => dayjs(date)),
    confirmedDateType,
  };
};

export const createMeeting = async ({
  meeting,
  setPassword,
}: {
  meeting: ValidCreateMeetingState;
  setPassword: boolean;
}) => {
  const meetingRequest = meetingStateToRequest(meeting, setPassword);

  const response: AxiosResponse<MeetingResponse> = await api.post('/meetings', meetingRequest);

  return response.data;
};

export const getMeeting = async (meetingId: string): Promise<Meeting> => {
  const response: AxiosResponse<MeetingResponse> = await api.get(`/meetings/${meetingId}`);

  const meeting = meetingResponseToState(response.data);

  return meeting;
};

export const updateMeeting = async (meeting: Meeting) => {
  const meetingId = meeting.id;

  const adminToken = getLocalStorageItem<string>(`meetings/${meetingId}/admin_token`);
  if (!adminToken) {
    throw new Error('adminToken is not set');
  }

  const response: AxiosResponse<MeetingResponse> = await api.put(
    `/meetings/${meetingId}`,
    meeting,
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    },
  );

  return response.data;
};

export const confirmMeeting = async (meetingId: string, slot: VotingSlot) => {
  const adminToken = getLocalStorageItem<string>(`meetings/${meetingId}/admin_token`);

  if (!adminToken) {
    throw new Error('adminToken is not set');
  }

  await api.post(`/meetings/${meetingId}/confirm`, slot, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
};

export const issuePrivateMeetingAdminToken = async ({
  meetingId,
  password,
}: {
  meetingId: string;
  password: string;
}) => {
  const response: AxiosResponse<{ token: string }> = await api.post(`/meetings/${meetingId}/auth`, {
    password,
  });

  return response.data.token;
};

export const issuePublicMeetingAdminToken = async (meetingId: string) => {
  const response: AxiosResponse<{ token: string }> = await api.post(`/meetings/${meetingId}/auth`);

  return response.data.token;
};
