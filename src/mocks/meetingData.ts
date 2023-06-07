import { GetMeetingResponse } from '../apis/types';
import { MeetingType } from '../constants/meeting';

export const mockDateTypeMeeting: GetMeetingResponse = {
  id: '1',
  name: 'mockDateTypeMeeting',
  dates: [
    '2022-11-25T01:44:39.114Z',
    '2022-11-26T01:44:39.114Z',
    '2022-11-27T01:44:39.114Z',
    '2022-11-28T01:44:39.114Z',
    '2022-11-29T01:44:39.114Z',
    '2022-11-30T01:44:39.114Z',
  ], // ISO date string with timezone
  type: MeetingType.date,
};

export const mockMealTypeMeeting: GetMeetingResponse = {
  id: '2',
  name: 'mockMealTypeMeeting',
  dates: [
    '2022-11-25T01:44:39.114Z',
    '2022-11-26T01:44:39.114Z',
    '2022-11-27T01:44:39.114Z',
    '2022-11-28T01:44:39.114Z',
    '2022-11-29T01:44:39.114Z',
    '2022-11-30T01:44:39.114Z',
  ], // ISO date string with timezone
  type: MeetingType.meal,
};
