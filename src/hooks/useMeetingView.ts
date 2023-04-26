import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { UserListData } from '../components/UserList/UserList';
import { Voting } from '../components/VoteTable/VoteTable';
import { userListState } from '../stores/voting';

export const useMeetingView = () => {
  const userListStateValue = useRecoilValue(userListState);
  const [userList, setUserList] = useState<UserListData[]>([]);

  useEffect(() => {
    setUserList(userListStateValue);
  }, [userListStateValue]);

  const handleClickUserList = (checked: boolean, target: UserListData) => {
    setUserList((prev) => {
      const { username } = target;
      const newUserList = resolveUserList(prev);
      const user = findUserByName(userList, username);

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

  const handleClickVoteTable = (checked: boolean, target: Voting) => {
    // TODO: 테이블 클릭 구현
  };

  return {
    handleClickUserList,
    handleClickVoteTable,
    userList,
  };
};

const findUserByName = (userList: UserListData[], name: string) => {
  const users = Object.values(userList);

  return users.find((user) => user.username === name);
};

const changeUser = (userList: UserListData[], newUser: UserListData) => {
  return userList.map((user) => {
    if (user.username === newUser.username) {
      return newUser;
    }

    return user;
  });
};

const resolveUserList = (userList: UserListData[]) => {
  return userList.map((user) => ({
    ...user,
    checked: false,
    focused: false,
  }));
};
