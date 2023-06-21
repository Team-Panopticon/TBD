import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { GetMeetingResponse } from '../apis/types';
import { VotingSlot, VotingSlotResponse } from '../apis/votes';
import { UserListData } from '../components/UserList/UserList';
import { votingsState } from '../stores/voting';

export const useMeetingResult = (meeting?: GetMeetingResponse) => {
  // todo: meeting respose 에서 가져오기
  const TempConfirmedVoting: VotingSlotResponse = {
    date: '2023-06-08T15:00:00.000Z',
  };
  const [confirmedUserList, setConfirmedUserList] = useState<UserListData[]>([]);

  const [missedUserList, setMissedUserList] = useState<UserListData[]>([]);
  const votings = useRecoilValue(votingsState);

  useEffect(() => {
    setConfirmedUserList([]);
    setMissedUserList([]);
    votings.forEach((voting) => {
      const { username, dateType, mealType, id } = voting;

      let isConfirmed = false;
      // mealType 이면
      if (TempConfirmedVoting.meal && mealType) {
        isConfirmed = !!mealType.find((meal: VotingSlot) => {
          return meal.date.isSame(dayjs(TempConfirmedVoting.date), 'day');
        });
      }
      if (TempConfirmedVoting.date && dateType) {
        isConfirmed = !!dateType.find((meal: VotingSlot) => {
          return meal.date.isSame(dayjs(TempConfirmedVoting.date), 'day');
        });
      }

      const newUser = {
        id,
        username,
        checked: false,
        focused: false,
      };
      if (isConfirmed) {
        setConfirmedUserList((prev) => [...prev, { ...newUser, checked: true }]);
      } else {
        setMissedUserList((prev) => [...prev, newUser]);
      }
    });
  }, [TempConfirmedVoting.date, TempConfirmedVoting.meal, votings]);

  return {
    confirmedUserList,
    missedUserList,
  };
};
