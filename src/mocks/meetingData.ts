import { MeetingResponse } from '../apis/types';
import { MeetingAccess, MeetingStatus, MeetingType } from '../constants/meeting';

export const mockDateTypeMeeting: MeetingResponse = {
  id: '1',
  name: 'mockDateTypeMeeting',
  dates: [
    '2023-11-25T01:44:39.114Z',
    '2023-11-26T01:44:39.114Z',
    '2023-11-27T01:44:39.114Z',
    '2023-11-28T01:44:39.114Z',
    '2023-11-29T01:44:39.114Z',
    '2023-11-30T01:44:39.114Z',
  ], // ISO date string with timezone
  type: MeetingType.date,
  status: MeetingStatus.inProgress,
  access: MeetingAccess.public,
};

export const mockMealTypeMeeting: MeetingResponse = {
  id: '2',
  name: 'mockMealTypeMeeting',
  dates: [
    '2023-11-25T01:44:39.114Z',
    '2023-11-26T01:44:39.114Z',
    '2023-11-27T01:44:39.114Z',
    '2023-11-28T01:44:39.114Z',
    '2023-11-29T01:44:39.114Z',
    '2023-11-30T01:44:39.114Z',
  ], // ISO date string with timezone
  type: MeetingType.meal,
  status: MeetingStatus.inProgress,
  access: MeetingAccess.public,
};
