import { Dayjs } from 'dayjs';

import { User } from '../../apis/users';
import { MealType, MeetingType } from '../../constants/meeting';

interface HasUserVotedForSlotProps {
  user: User;
  date: Dayjs;
  mealType?: MealType;
}

export const hasUserVotedForSlot = ({ user, date, mealType }: HasUserVotedForSlotProps) => {
  const meetingType = mealType ? MeetingType.meal : MeetingType.date;
  const votings = user.votings[meetingType];
  const hasUserVoted = votings.some(
    (vote) => vote.date.isSame(date, 'day') && vote.meal === mealType,
  );

  return hasUserVoted;
};
