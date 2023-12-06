import { useMeeting } from '../useMeeting';

export const useMeetingResultHeader = () => {
  const { meeting } = useMeeting();

  return {
    meeting,
    meetingDate: meeting?.confirmedDateType?.date,
    meetingMeal: meeting?.confirmedDateType?.meal,
  };
};
