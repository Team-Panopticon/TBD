import { Dayjs } from 'dayjs';
import { atom } from 'recoil';

import { MeetingStatus, MeetingType } from '../constants/meeting';

export interface CreateMeetingState {
  name?: string;
  /** 투표 가능 날짜, Dayjs */
  dates: Dayjs[];
  type: MeetingType;
  /** ISO date string with timezone */
  deadline?: Dayjs;
  status: MeetingStatus;
  password?: string;
}

export interface ValidCreateMeetingState extends CreateMeetingState{
  name: string;
  deadline: Dayjs;
}

export const initialState: CreateMeetingState = {
  name: undefined,
  dates: [],
  type: MeetingType.date,
  deadline: undefined,
  status: MeetingStatus.inProgress,
  password: undefined,
};

export const createMeetingState = atom<CreateMeetingState>({
  key: 'createMeeting',
  default: initialState,
});

export const validateMeetingName = (name: string) => {
  return name.length > 0;
}

interface ValidateSelectedDatesProps {
  selectedDates: Dayjs[];
  today: Dayjs;
}

export const validateSelectedDates = ({ selectedDates, today }: ValidateSelectedDatesProps) => {
  if (selectedDates.length === 0){
    return false;
  }
  const isSameOrAfterToday = selectedDates.every((date) => date.isSame(today) || date.isAfter(today));
  return isSameOrAfterToday;
}

interface ValidateDeadlineProps {
  deadline: Dayjs;
  today: Dayjs;
}

export const validateDeadline = ({ deadline, today }: ValidateDeadlineProps) => {
  const isSameOrAfterToday = deadline.isSame(today) || deadline.isAfter(today);
  return isSameOrAfterToday;
}

export const validatePassword = (password: string) => {
  if (password.length !== 4) {
    return false
  }
  
  const digitStringRegex = /^[0-9]+$/;
  const isDigitString = digitStringRegex.test(password);

  return isDigitString;
}

