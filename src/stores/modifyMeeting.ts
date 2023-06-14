import { atom } from 'recoil';

import { MeetingStatus, MeetingType } from '../constants/meeting';

export interface ModifyMeetingState {
  name: string;
  /** 투표 가능 날짜, ISO date string with timezone */
  dates: string[];
  type: MeetingType;
  status: MeetingStatus;
  password: string;
}

export const initialState: ModifyMeetingState = {
  name: '',
  dates: [],
  type: MeetingType.date,
  status: MeetingStatus.inProgress,
  password: '',
};

export const modifyMeetingState = atom<ModifyMeetingState>({
  key: 'modifyMeeting',
  default: initialState,
});
