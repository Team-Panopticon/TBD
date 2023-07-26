import dayjs, { Dayjs } from 'dayjs';
import { useRecoilState, useRecoilValue } from 'recoil';

import { GetMeetingResponse } from '../apis/types';
import { Voting, VotingSlot } from '../apis/votes';
import { VoteTableRowData, VoteTableVoting } from '../components/VoteTable/VoteTable';
import { MeetingType } from '../constants/meeting';
import { currentUserStateFamily } from '../stores/currentUser';
import { currentUserVotingSlotsState } from '../stores/currentUserVotingSlots';
import { getVotings, votingsState } from '../stores/voting';

export const useMeetingViewVoteMode = (meeting?: GetMeetingResponse) => {
  const currentUser = useRecoilValue(currentUserStateFamily(meeting?.id ?? ''));
  const [currentUserVotingSlots, setCurrentUserVotingSlots] = useRecoilState(
    currentUserVotingSlotsState,
  );

  const votings = useRecoilValue(votingsState);
  const otherUserVotings = votings.filter((voting) => voting.id !== currentUser?.id);

  // TODO: 신규 유저 외에 기존 유저 선택 시 로직 반영
  const currentVoting: Voting = {
    id: currentUser?.id ?? 'newUser',
    username: currentUser?.username ?? 'newUser',
    dateType: meeting?.type === MeetingType.date ? currentUserVotingSlots : [],
    mealType: meeting?.type === MeetingType.meal ? currentUserVotingSlots : [],
  };

  const isNewUser = currentUser === undefined;
  const hasNewUserNotVoted = isNewUser && currentUserVotingSlots.length === 0;

  // voteTableDataList는 userMap, currentUser, 마지막 클릭된 slot / userName의 파생 상태
  const voteTableDataList = meeting?.dates.map(dayjs).map<VoteTableRowData>((day) => ({
    date: day,
    votings: getVotings(
      meeting.type,
      day,
      otherUserVotings,
      hasNewUserNotVoted ? undefined : currentVoting,
    ),
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
    setCurrentUserVotingSlots,
    handleClickVoteTableSlot,
  };
};

export const isSameSlot = (slot1: VotingSlot, slot2: VotingSlot) => {
  return slot1.date.isSame(slot2.date, 'day') && slot1.meal === slot2.meal;
};
