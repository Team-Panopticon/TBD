import { Dayjs } from 'dayjs';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { Voting, VotingSlot } from '../../apis/votes';
import { UserListData } from '../../components/UserList/UserList';
import { VoteTableRowData, VoteTableVoting } from '../../components/VoteTable/VoteTable';
import { MealType, MeetingType } from '../../constants/meeting';
import { currentUserStateFamily } from '../../stores/currentUser';
import { currentUserVotingSlotsState } from '../../stores/currentUserVotingSlots';
import { getVotings, userListState, votingsState } from '../../stores/voting';
import { useMeeting } from '../useMeeting';

export const useMeetingVoteContents = () => {
  const { meetingId, meeting } = useMeeting();

  const [currentUser, setCurrentUser] = useRecoilState(currentUserStateFamily(meetingId));
  const resetCurrentUser = useResetRecoilState(currentUserStateFamily(meetingId));

  const [currentUserVotingSlots, setCurrentUserVotingSlots] = useRecoilState(
    currentUserVotingSlotsState,
  );
  const votings = useRecoilValue(votingsState);
  const userList = useRecoilValue(userListState);

  const checkedUserList = userList.map((user) => ({
    ...user,
    checked: user.id === currentUser?.id,
  }));
  const otherUserVotings = votings.filter((voting) => voting.id !== currentUser?.id);
  const isNewUser = currentUser === undefined;
  const hasNewUserNotVoted = isNewUser && currentUserVotingSlots.length === 0;

  // TODO: 신규 유저 외에 기존 유저 선택 시 로직 반영
  const currentVoting: Voting = {
    id: currentUser?.id ?? 'newUser',
    username: currentUser?.username ?? 'newUser',
    dateType: meeting?.type === MeetingType.date ? currentUserVotingSlots : [],
    mealType: meeting?.type === MeetingType.meal ? currentUserVotingSlots : [],
  };

  // voteTableDataList는 userMap, currentUser, 마지막 클릭된 slot / userName의 파생 상태
  const voteTableDataList = meeting?.dates.map<VoteTableRowData>((day) => ({
    date: day,
    votings: getVotings(
      meeting.type,
      day,
      otherUserVotings,
      hasNewUserNotVoted ? undefined : currentVoting,
    ),
  }));

  const handleClickUser = (checked: boolean, clickedUser: UserListData) => {
    if (!meeting) {
      return;
    }

    const isCurrentUserClicked = currentUser?.id === clickedUser.id;
    if (isCurrentUserClicked) {
      setCurrentUser(undefined);
      resetCurrentUser();
      setCurrentUserVotingSlots([]);
      return;
    }

    setCurrentUser({
      id: clickedUser.id,
      username: clickedUser.username,
    });

    const previousVoting = votings.find((voting) => voting.username === clickedUser.username);
    const previousVotingSlots = previousVoting?.[meeting.type];
    setCurrentUserVotingSlots(previousVotingSlots ?? []);
  };

  const handleClickVoteTableDate = (date: Dayjs) => {
    if (!meeting) {
      return;
    }

    if (meeting.type === MeetingType.date) {
      const isAlreadyVoted = currentUserVotingSlots.some((voting) =>
        voting.date.isSame(date, 'day'),
      );
      const votingSlotsWithoutGivenDate = currentUserVotingSlots.filter(
        (voting) => !voting.date.isSame(date, 'day'),
      );

      if (isAlreadyVoted) {
        setCurrentUserVotingSlots(votingSlotsWithoutGivenDate);
      } else {
        setCurrentUserVotingSlots([...votingSlotsWithoutGivenDate, { date }]);
      }
    }

    if (meeting.type === MeetingType.meal) {
      const isLunchAndDinnerVoted =
        currentUserVotingSlots.filter((voting) => voting.date.isSame(date, 'day')).length === 2;

      const votingSlotsWithoutGivenDate = currentUserVotingSlots.filter(
        (voting) => !voting.date.isSame(date, 'day'),
      );

      if (isLunchAndDinnerVoted) {
        setCurrentUserVotingSlots(votingSlotsWithoutGivenDate);
      } else {
        setCurrentUserVotingSlots([
          ...votingSlotsWithoutGivenDate,
          { date, meal: MealType.lunch },
          { date, meal: MealType.dinner },
        ]);
      }
    }
  };

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
    voteTableDataList: voteTableDataList || [],
    currentUserVotingSlots,
    setCurrentUserVotingSlots,
    handleClickVoteTableSlot,
    handleClickVoteTableDate,
    checkedUserList,
    handleClickUser,
    meeting,
  };
};

export const isSameSlot = (slot1: VotingSlot, slot2: VotingSlot) => {
  return slot1.date.isSame(slot2.date, 'day') && slot1.meal === slot2.meal;
};
