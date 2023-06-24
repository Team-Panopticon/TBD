import { Dayjs } from 'dayjs';
import { atom } from 'recoil';

import { MeetingStatus, MeetingType } from '../constants/meeting';

export interface CreateMeetingState {
  name?: string;
  /** 투표 가능 날짜, Dayjs */
  dates: Dayjs[];
  type: MeetingType;
  status: MeetingStatus;
  password?: string;
}

export interface ValidCreateMeetingState extends CreateMeetingState {
  name: string;
}

export const initialState: CreateMeetingState = {
  name: undefined,
  dates: [],
  type: MeetingType.date,
  status: MeetingStatus.inProgress,
  password: undefined,
};

export const createMeetingState = atom<CreateMeetingState>({
  key: 'createMeeting',
  default: initialState,
});

export const validateMeetingName = (name: string) => {
  return name.length > 0;
};

interface ValidateSelectedDatesProps {
  selectedDates: Dayjs[];
  today: Dayjs;
}

export const validateSelectedDates = ({ selectedDates, today }: ValidateSelectedDatesProps) => {
  if (selectedDates.length === 0) {
    return false;
  }
  const isSameOrAfterToday = selectedDates.every(
    (date) => date.isSame(today) || date.isAfter(today),
  );
  return isSameOrAfterToday;
};

export const validatePassword = (password: string) => {
  if (password.length !== 4) {
    return false;
  }

  const digitStringRegex = /^[0-9]+$/;
  const isDigitString = digitStringRegex.test(password);

  return isDigitString;
};

export const validateMeeting = (state: CreateMeetingState, today: Dayjs) => {
  const { name, dates } = state;
  const isNameValid = name !== undefined && validateMeetingName(name);
  const isDatesValid = validateSelectedDates({ selectedDates: dates, today });

  return isNameValid && isDatesValid;
};
