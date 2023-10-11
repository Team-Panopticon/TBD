import { MeetingResponse } from '../apis/types';
import { MeetingAdminAccess, MeetingStatus, MeetingType } from '../constants/meeting';

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
    '2023-12-01T01:44:39.114Z',
    '2023-12-02T01:44:39.114Z',
    '2023-12-03T01:44:39.114Z',
    '2023-12-04T01:44:39.114Z',
    '2023-12-05T01:44:39.114Z',
    '2023-12-06T01:44:39.114Z',
    '2023-12-07T01:44:39.114Z',
    '2023-12-08T01:44:39.114Z',
    '2023-12-09T01:44:39.114Z',
    '2023-12-10T01:44:39.114Z',
    '2023-12-11T01:44:39.114Z',
  ], // ISO date string with timezone
  type: MeetingType.date,
  status: MeetingStatus.inProgress,
  adminAccess: MeetingAdminAccess.public,
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
  adminAccess: MeetingAdminAccess.public,
};
