import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { GetMeetingResponse } from '../apis/types';
import { UserListData } from '../components/UserList/UserList';
import { VoteTableData, Votings } from '../components/VoteTable/VoteTable';
import { userListState, voteTableDataListState } from '../stores/voting';

export const useMeetingView = (meeting?: GetMeetingResponse) => {
  const userListStateValue = useRecoilValue(userListState);
  const voteTableDataListValue = useRecoilValue(voteTableDataListState(meeting));

  const [userList, setUserList] = useState<UserListData[]>([]);
  const [voteTableDataList, setvoteTableDataList] = useState<VoteTableData[]>([]);

  useEffect(() => {
    setUserList(userListStateValue);
    if (voteTableDataListValue) {
      setvoteTableDataList(voteTableDataListValue);
    }
  }, [userListStateValue, voteTableDataListValue, meeting]);

  const handleClickUserList = (checked: boolean, target: UserListData) => {
    setvoteTableDataList((prev) => {
      return resolveVoteTableDataList(prev);
    });

    setUserList((prev) => {
      const { username } = target;
      const newUserList = resolveUserList(prev);
      const user = findUserByName(newUserList, username);

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
    setUserList((prev) => {
      return resolveUserList(prev);
    });

    setvoteTableDataList((prev) => {
      const { date } = target;
      const newVoteTableDataList = resolveVoteTableDataList(prev);
      const voteTableData = findVoteTableDataByDate(newVoteTableDataList, date);

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

const findUserByName = (userList: UserListData[], name: string) => {
  return userList.find((user) => user.username === name);
};

const findVoteTableDataByDate = (voteTableDataList: VoteTableData[], date: Dayjs) => {
  return voteTableDataList.find((voteTableData) => voteTableData.date.isSame(date));
};

const changeUser = (userList: UserListData[], newUser: UserListData) => {
  return userList.map((user) => {
    if (user.username === newUser.username) {
      return newUser;
    }

    return user;
  });
};

const changeVoteTableData = (
  voteTableDatList: VoteTableData[],
  newVoteTableData: VoteTableData,
) => {
  return voteTableDatList.map((voteTableData) => {
    if (newVoteTableData.date.isSame(voteTableData.date)) {
      return newVoteTableData;
    }

    return voteTableData;
  });
};

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
