import { MeetingStatus, MeetingType } from '../constants/meeting';

export type ISODateTime = string;

export interface CreateMeetingRequest {
  name: string;
  dates: ISODateTime[];
  type: MeetingType;
  deadline: ISODateTime;
  password?: string;
}

export interface CreateMeetingResponse extends CreateMeetingRequest {
  id: string;
  status: MeetingStatus;
}
