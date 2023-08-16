import { Dayjs } from 'dayjs';

import { MeetingAccess, MeetingStatus, MeetingType } from '../constants/meeting';
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
  access: MeetingAccess;
}

export type Meeting = Omit<MeetingResponse, 'dates'> & {
  dates: Dayjs[];
};
