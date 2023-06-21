import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { GetMeetingResponse } from '../apis/types';
import { VotingSlot } from '../apis/votes';
import { UserListData } from '../components/UserList/UserList';
import { VoteTableRowData, VoteTableVoting } from '../components/VoteTable/VoteTable';
import { MeetingType } from '../constants/meeting';
import { userListState, voteTableDataListState, votingsState } from '../stores/voting';
import { isSameSlot } from './useMeetingVote';

export const useMeetingView = (meeting?: GetMeetingResponse) => {
  const votings = useRecoilValue(votingsState);
  const userListStateValue = useRecoilValue(userListState);
  const voteTableDataListValue = useRecoilValue(voteTableDataListState(meeting));

  const [userList, setUserList] = useState<UserListData[]>([]);
  const [voteTableDataList, setVoteTableDataList] = useState<VoteTableRowData[]>([]);

  useEffect(() => {
    setUserList(userListStateValue);
    if (voteTableDataListValue) {
      setVoteTableDataList(voteTableDataListValue);
    }
  }, [userListStateValue, voteTableDataListValue, meeting]);

  const handleClickUserList = (checked: boolean, target: UserListData) => {
    const meetingType = meeting?.type === MeetingType.date ? MeetingType.date : MeetingType.meal;

    const targetVoting = votings.find((voting) => voting.username === target.username);

    if (!targetVoting) {
      return;
    }

    const votedDates = targetVoting[meetingType];

    if (!votedDates) {
      return;
    }

    setVoteTableDataList((prev) => {
      if (checked) {
        return resolveVoteTableDataList(prev).map((voteTableData) => {
          const isVoted = votedDates.some((votedDate) => isSameSlot(votedDate, voteTableData));
          if (isVoted) {
            return checkVoteTableData(voteTableData);
          }

          return voteTableData;
        });
      }

      return resolveVoteTableDataList(prev);
    });

    setUserList((prev) => {
      const { username } = target;
      const newUserList = resolveUserList(prev);
      const user = newUserList.find((user) => user.username === username);

      if (user) {
        return changeUser(newUserList, {
          ...user,
          checked,
          focused: checked,
        });
      }

      return newUserList;
    });
  };

  const handleClickVoteTable = (
    date: Dayjs,
    checked: boolean,
    target: VoteTableVoting,
    slot: VotingSlot,
  ) => {
    const meetingType = meeting?.type === MeetingType.date ? MeetingType.date : MeetingType.meal;

    const usernames = votings
      .filter((voting) => voting[meetingType]?.some((votingSlot) => isSameSlot(votingSlot, slot)))
      .map((voting) => {
        return voting.username;
      });

    setUserList((prev) => {
      if (checked) {
        return resolveUserList(prev).map((user) => {
          const isVotedUser = usernames.some((username) => username === user.username);

          if (isVotedUser) {
            return checkUser(user);
          }

          return user;
        });
      }

      return resolveUserList(prev);
    });

    setVoteTableDataList((prev) => {
      const { date: targetDate } = slot;
      const newVoteTableDataList = resolveVoteTableDataList(prev);
      const voteTableData = newVoteTableDataList.find(({ date }) => date.isSame(targetDate));

      if (voteTableData) {
        const { votings } = voteTableData;

        const newVotings = votings.map((voting) => {
          // MeetingType이 date이거나 mealType이 slot의 meal과 동일할 때만 checked를 반영
          if (meetingType === MeetingType.date || voting.mealType === slot.meal) {
            return {
              ...voting,
              checked,
              focused: checked,
            };
          } else {
            // 위 조건에 만족하지 않으면 클릭되지 않은 슬롯이므로 checked & focused가 false (ex. dinner가 클릭됬고 현재 voting은 lunch인 경우)
            return {
              ...voting,
              checked: false,
              focused: false,
            };
          }
        }) as [VoteTableVoting, VoteTableVoting] | [VoteTableVoting];

        return changeVoteTableData(newVoteTableDataList, {
          ...voteTableData,
          votings: newVotings,
        });
      }

      return newVoteTableDataList;
    });
  };

  return {
    handleClickUserList,
    handleClickVoteTable,
    userList,
    voteTableDataList,
  };
};

const changeData = <T>(dataList: T[], newData: T, predicate: (data: T) => boolean) => {
  return dataList.map((data) => (predicate(data) ? newData : data));
};

const changeUser = (userList: UserListData[], newUser: UserListData) =>
  changeData(userList, newUser, (user) => user.username === newUser.username);

const changeVoteTableData = (
  voteTableDatList: VoteTableRowData[],
  newVoteTableData: VoteTableRowData,
) =>
  changeData(voteTableDatList, newVoteTableData, ({ date }) => date.isSame(newVoteTableData.date));

const resolveUserList = (userList: UserListData[]) => {
  return userList.map((user) => ({
    ...user,
    checked: false,
    focused: false,
  }));
};

const resolveVoteTableDataList = (voteTableDataList: VoteTableRowData[]) => {
  return voteTableDataList.map((voteTableData) => {
    const { votings } = voteTableData;

    const newVotings = votings.map((voting) => ({ ...voting, checked: false, focused: false }));

    return {
      ...voteTableData,
      votings: newVotings,
    };
  }) as VoteTableRowData[];
};

const checkVoteTableData = (voteTableData: VoteTableRowData) => {
  const { votings } = voteTableData;
  const newVotings = votings.map((voting) => ({ ...voting, checked: true, focused: false }));

  return {
    ...voteTableData,
    votings: newVotings,
  } as VoteTableRowData;
};

const checkUser = (user: UserListData) => {
  return {
    ...user,
    checked: true,
    focus: false,
  };
};
