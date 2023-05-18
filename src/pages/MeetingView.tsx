import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { getMeeting } from '../apis/meetings';
import { GetMeetingResponse } from '../apis/types';
import { getUsers, UserMap } from '../apis/users';
import { Contents, Footer, Header, HeaderContainer, Page } from '../components/pageLayout';
import { FullHeightButtonGroup } from '../components/styled';
import { UserList } from '../components/UserList/UserList';
import { VoteTable } from '../components/VoteTable/VoteTable';
import { useMeetingView } from '../hooks/useMeetingView';
import { userMapState } from '../stores/voting';

export function MeetingView() {
  const MEETING_ID = '1';

  const setUserMap = useSetRecoilState<UserMap>(userMapState);
  const [meeting, setMeeting] = useState<GetMeetingResponse>();

  const { handleClickUserList, handleClickVoteTable, userList, voteTableDataList } =
    useMeetingView(meeting);

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
    <Page>
      <Header>
        <HeaderContainer>
          <h1>{meeting.name}</h1>
        </HeaderContainer>
      </Header>
      <Contents>
        {/* <VoteTable data={mockData} headers={['점심', '저녁']} /> */}
        <UserList users={userList} onClick={handleClickUserList} />
        <VoteTable
          onClick={handleClickVoteTable}
          data={voteTableDataList}
          headers={['투표 현황']}
        />
      </Contents>
      <Footer>
        <FullHeightButtonGroup
          fullWidth
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Button
            color="secondary"
            onClick={() => {
              /**
               * @TODO 투표모드로 변경
               */
            }}
          >
            다시 투표하러 가기
          </Button>
        </FullHeightButtonGroup>
      </Footer>
    </Page>
  );
}
