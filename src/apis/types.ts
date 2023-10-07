import { Dayjs } from 'dayjs';

import { MeetingAdminAccess, MeetingStatus, MeetingType } from '../constants/meeting';
import { VotingSlot, VotingSlotResponse } from './votes';

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
  adminAccess: MeetingAdminAccess;
}

export type Meeting = Omit<MeetingResponse, 'dates' | 'confirmedDateType'> & {
  dates: Dayjs[];
  confirmedDateType?: VotingSlot;
};
