import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { GetMeetingResponse } from '../apis/types';
import { UserListData } from '../components/UserList/UserList';
import { VoteTableData, Votings } from '../components/VoteTable/VoteTable';
import { MeetingType } from '../constants/meeting';
import { userListState, userMapState, voteTableDataListState } from '../stores/voting';

export const useMeetingView = (meeting?: GetMeetingResponse) => {
  const userMap = useRecoilValue(userMapState);
  const userListStateValue = useRecoilValue(userListState);
  const voteTableDataListValue = useRecoilValue(voteTableDataListState(meeting));

  const [userList, setUserList] = useState<UserListData[]>([]);
  const [voteTableDataList, setVoteTableDataList] = useState<VoteTableData[]>([]);

  useEffect(() => {
    setUserList(userListStateValue);
    if (voteTableDataListValue) {
      setVoteTableDataList(voteTableDataListValue);
    }
  }, [userListStateValue, voteTableDataListValue, meeting]);

  const handleClickUserList = (checked: boolean, target: UserListData) => {
    const meetingType = meeting?.type === MeetingType.date ? MeetingType.date : MeetingType.meal;

    const user = Object.entries(userMap).find(([, value]) => value.name === target.username);

    if (!user) {
      return;
    }

    const { votings } = userMap[user[0]];

    const votedDates = votings[meetingType].map((voting) => dayjs(voting.date));

    setVoteTableDataList((prev) => {
      if (checked) {
        return resolveVoteTableDataList(prev).map((voteTableData) => {
          const isVoted = votedDates.some((votedDate) => votedDate.isSame(voteTableData.date));
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

  const handleClickVoteTable = (checked: boolean, target: VoteTableData) => {
    const meetingType = meeting?.type === MeetingType.date ? MeetingType.date : MeetingType.meal;

    const usernames = Object.values(userMap)
      .filter((user) => user.votings[meetingType].some(({ date }) => target.date.isSame(date)))
      .map((user) => {
        return user.name;
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
      const { date: targetDate } = target;
      const newVoteTableDataList = resolveVoteTableDataList(prev);
      const voteTableData = newVoteTableDataList.find(({ date }) => date.isSame(targetDate));

      if (voteTableData) {
        const { votings } = voteTableData;

        const newVotings = votings.map((voting) => ({
          ...voting,
          checked,
          focused: checked,
        })) as Votings;

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

const changeVoteTableData = (voteTableDatList: VoteTableData[], newVoteTableData: VoteTableData) =>
  changeData(voteTableDatList, newVoteTableData, ({ date }) => date.isSame(newVoteTableData.date));

const resolveUserList = (userList: UserListData[]) => {
  return userList.map((user) => ({
    ...user,
    checked: false,
    focused: false,
  }));
};

const resolveVoteTableDataList = (voteTableDataList: VoteTableData[]) => {
  return voteTableDataList.map((voteTableData) => {
    const { votings } = voteTableData;

    const newVotings = votings.map((voting) => ({ ...voting, checked: false, focused: false }));

    return {
      ...voteTableData,
      votings: newVotings,
    };
  }) as VoteTableData[];
};

const checkVoteTableData = (voteTableData: VoteTableData) => {
  const { votings } = voteTableData;
  const newVotings = votings.map((voting) => ({ ...voting, checked: true, focused: false }));

  return {
    ...voteTableData,
    votings: newVotings,
  } as VoteTableData;
};

const checkUser = (user: UserListData) => {
  return {
    ...user,
    checked: true,
    focus: false,
  };
};
