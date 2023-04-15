import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { getMeeting } from '../apis/meetings';
import { GetMeetingResponse } from '../apis/types';
import { getUsers, GetUsersResponse } from '../apis/users';
import { UserList } from '../components/UserList/UserList';
import { VoteTable } from '../components/VoteTable/VoteTable';
import { currentUserState } from '../stores/currentUser';
import { userListState, userMapState, voteTableDataListState } from '../stores/voting';

export function MeetingView() {
  const currentUser = useRecoilValue(currentUserState);
  const [isViewMode, setIsViewMode] = useState<boolean>(!!currentUser);

  const MEETING_ID = '1';

  const setUserMap = useSetRecoilState<GetUsersResponse>(userMapState);
  const [meeting, setMeeting] = useState<GetMeetingResponse>();

  const userList = useRecoilValue(userListState);
  const voteTableDataList = useRecoilValue(voteTableDataListState(meeting));

  useEffect(() => {
    (async () => {
      const data = await getUsers(1);
      setUserMap(data);

      const meetingData = await getMeeting(MEETING_ID);
      setMeeting(meetingData);
    })();
  }, [setUserMap]);

  if (!meeting || !voteTableDataList) {
    return null;
  }

  return (
    <div>
      <h1>모임 이름</h1>
      <div>toast message</div>
      <UserList users={userList} />
      {/* <VoteTable data={mockData} headers={['점심', '저녁']} /> */}
      <VoteTable data={voteTableDataList} headers={['투표 현황']} />
      {isViewMode ? <div>다시 투표하러 가기</div> : <div>다음에하기 + 투표하기</div>}
    </div>
  );
}
