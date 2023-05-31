import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { GetMeetingResponse } from '../apis/types';
import { Voting, VotingSlot } from '../apis/votes';
import { VoteTableRowData, VoteTableVoting } from '../components/VoteTable/VoteTable';
import { MeetingType } from '../constants/meeting';
import { getVotingCountByDay, votingsState } from '../stores/voting';

export const useMeetingViewVoteMode = (meeting?: GetMeetingResponse) => {
  // userMap, currentUserVotings, lastClickedSlot, lastClickedUser 상태관리
  const [currentUserVotingSlots, setCurrentUserVotingSlots] = useState<VotingSlot[]>([]);

  const votings = useRecoilValue(votingsState);
  const currentVoting: Voting = {
    id: 'newUser',
    username: 'newUser',
    dateType: meeting?.type === MeetingType.date ? currentUserVotingSlots : [],
    mealType: meeting?.type === MeetingType.meal ? currentUserVotingSlots : [],
  };

  const userVotingsWithCurrentUser = [...votings, currentVoting];

  // voteTableDataList는 userMap, currentUser, 마지막 클릭된 slot / userName의 파생 상태
  const voteTableDataList = meeting?.dates.map(dayjs).map<VoteTableRowData>((day) => ({
    date: day,
    votings: [
      {
        current: getVotingCountByDay(day, userVotingsWithCurrentUser),
        total: userVotingsWithCurrentUser.length,
        checked: currentUserVotingSlots.some((voting) => voting.date.isSame(day, 'day')),
        focused: false,
      },
    ],
  }));

  const handleClickVoteTableSlot = (
    date: Dayjs,
    checked: boolean,
    target: VoteTableVoting,
    slot: VotingSlot,
  ) => {
    const hasAlreadyVotedOnSlot = currentUserVotingSlots.some((voting) => isSameSlot(voting, slot));
    if (hasAlreadyVotedOnSlot) {
      setCurrentUserVotingSlots((prev) => prev.filter((voting) => !isSameSlot(voting, slot)));
    } else {
      setCurrentUserVotingSlots((prev) => [...prev, slot]);
    }
  };

  return {
    voteTableDataList,
    currentUserVotingSlots,
    handleClickVoteTableSlot,
  };
};

export const isSameSlot = (slot1: VotingSlot, slot2: VotingSlot) => {
  return slot1.date.isSame(slot2.date, 'day') && slot1.meal === slot2.meal;
};
