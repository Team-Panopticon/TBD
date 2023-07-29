import { MeetingStatus, MeetingType } from '../constants/meeting';
import { VotingSlotResponse } from './votes';

export type ISODateTime = string;

export interface CreateMeetingRequest {
  name: string;
  dates: ISODateTime[];
  type: MeetingType;
  password?: string;
}

export interface MeetingResponse extends CreateMeetingRequest {
  id: string;
  status: MeetingStatus;
  confirmedDateType?: VotingSlotResponse;
}
