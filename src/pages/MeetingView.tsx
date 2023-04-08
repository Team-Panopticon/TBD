import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { getUsers, Users } from '../apis/users';
import { UserList, UserListData } from '../components/UserList/UserList';
import { currentUserState } from '../stores/currentUser';

export function MeetingView() {
  const currentUser = useRecoilValue(currentUserState);
  const [isViewMode, setIsViewMode] = useState<boolean>(!!currentUser);
  const [voteList, setVoteList] = useState<any>({});
  const [userMap, setUserMap] = useState<Users>({});

  useEffect(() => {
    (async () => {
      const data = await getUsers(1);
      setUserMap(data);
    })();
  }, []);

  const userList = Object.keys(userMap).map<UserListData>((username) => {
    return {
      username,
      checked: false,
      focused: false,
    };
  });

  return (
    <div>
      <h1>모임 이름</h1>
      <div>toast message</div>
      <UserList users={userList} />
      {/* <VoteTable data={mockData} headers={['점심', '저녁']} /> */}
      {/* <VoteTable data={mockData2} headers={['투표 현황']} /> */}
      {isViewMode ? <div>다시 투표하러 가기</div> : <div>다음에하기 + 투표하기</div>}
    </div>
  );
}
