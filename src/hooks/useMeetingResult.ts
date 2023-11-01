import { useRecoilValue } from 'recoil';

import { Meeting } from '../apis/types';
import { Voting, VotingSlot } from '../apis/votes';
import { UserListData } from '../components/UserList/UserList';
import { MeetingType } from '../constants/meeting';
import { votingsState } from '../stores/voting';

export const useMeetingResult = (meeting?: Meeting) => {
  const votings = useRecoilValue(votingsState);

  return {
    confirmedUserList: getConfirmedUserList(votings, meeting),
    missedUserList: getMissedUserList(votings, meeting),
  };
};

const getMissedUserList = (votings: Voting[], meeting?: Meeting) => {
  const meetingType = meeting?.type || MeetingType.date;

  return votings
    .filter((voting) => {
      const votingDates = voting[meetingType];
      return !votingDates?.find((meal: VotingSlot) => {
        return (
          meal.date.isSame(meeting?.confirmedDateType?.date, 'day') &&
          meal.meal === meeting?.confirmedDateType?.meal
        );
      });
    })
    .map<UserListData>((voting) => {
      const { username, id } = voting;

      return {
        id,
        username,
        checked: false,
        focused: false,
      };
    });
};

const getConfirmedUserList = (votings: Voting[], meeting?: Meeting) => {
  const meetingType = meeting?.type || MeetingType.date;

  return votings
    .filter((voting) => {
      const votingDates = voting[meetingType];

      return !!votingDates?.find((meal: VotingSlot) => {
        return (
          meal.date.isSame(meeting?.confirmedDateType?.date, 'day') &&
          meal.meal === meeting?.confirmedDateType?.meal
        );
      });
    })
    .map<UserListData>((voting) => {
      const { username, id } = voting;
      return {
        id,
        username,
        checked: true,
        focused: false,
      };
    });
};
