import dayjs from 'dayjs';
import { useState } from 'react';

import { UserList, UserListData } from '../components/UserList/UserList';
import { VoteTable, VoteTableData } from '../components/VoteTable/VoteTable';

export function MeetingView() {
  const [isViewMode, setIsViewMode] = useState(false);

  const mockData: VoteTableData[] = [
    {
      date: dayjs('2022-11-26T01:44:39.114Z'),
      votings: [
        { total: 8, current: 8, checked: false, focused: false },
        { total: 8, current: 3, checked: true, focused: false },
      ],
    },
    {
      date: dayjs('2022-11-26T01:44:39.114Z'),
      votings: [
        { total: 8, current: 5, checked: true, focused: false },
        { total: 8, current: 3, checked: false, focused: false },
      ],
    },
  ];

  const mockData2: VoteTableData[] = [
    {
      date: dayjs('2022-11-26T01:44:39.114Z'),
      votings: [{ total: 8, current: 8, checked: false, focused: false }],
    },
    {
      date: dayjs('2022-11-26T01:44:39.114Z'),
      votings: [{ total: 8, current: 5, checked: true, focused: false }],
    },
  ];

  const mockUserList: UserListData[] = [
    { username: '김철수', checked: false, focused: false },
    { username: '김영희', checked: false, focused: false },
    { username: '김민수', checked: false, focused: false },
  ];

  return (
    <div>
      <h1>모임 이름</h1>
      <div>toast message</div>
      <UserList users={mockUserList} />
      <VoteTable data={mockData} headers={['점심', '저녁']} />
      <VoteTable data={mockData2} headers={['투표 현황']} />
      {isViewMode ? <div>다시 투표하러 가기</div> : <div>다음에하기 + 투표하기</div>}
    </div>
  );
}
