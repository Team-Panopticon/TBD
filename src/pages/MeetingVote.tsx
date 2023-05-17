import { Alert, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { getMeeting } from '../apis/meetings';
import { GetMeetingResponse } from '../apis/types';
import { getUsers, UserMap } from '../apis/users';
import { Contents, Footer, Header, HeaderContainer, Page } from '../components/pageLayout';
import { FullHeightButtonGroup } from '../components/styled';
import { UserList } from '../components/UserList/UserList';
import { VoteTable } from '../components/VoteTable/VoteTable';
import { useMeetingViewVoteMode } from '../hooks/useMeetingViewVoteMode';
import { currentUserState } from '../stores/currentUser';
import { userListState, userMapState } from '../stores/voting';

interface MeetingVoteRouteParams {
  meetingId: string;
}

export function MeetingVote() {
  const { meetingId } = useParams<keyof MeetingVoteRouteParams>() as MeetingVoteRouteParams;

  const currentUser = useRecoilValue(currentUserState);
  const isNewUser = !currentUser;

  const [meeting, setMeeting] = useState<GetMeetingResponse>();
  const [userMap, setUserMap] = useRecoilState<UserMap>(userMapState);
  const userList = useRecoilValue(userListState);

  const { voteTableDataList, handleClickVoteTableSlot } = useMeetingViewVoteMode(meeting);

  useEffect(() => {
    (async () => {
      const data = await getUsers(meetingId);
      setUserMap(data);

      const meetingData = await getMeeting(meetingId);
      setMeeting(meetingData);
    })();
  }, [meetingId, setUserMap]);

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
        {isNewUser && (
          <Alert severity="warning">이미 투표한 적이 있으면 아이디를 눌러주세요.</Alert>
        )}
        <UserList users={userList} />
        {/* <VoteTable data={mockData} headers={['점심', '저녁']} /> */}
        <VoteTable
          onClick={handleClickVoteTableSlot}
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
               * @TODO viewmode로 변경
               */
            }}
          >
            다음에하기
          </Button>
          <Button
            onClick={() => {
              /**
               * @TODO 투표 api
               */
            }}
          >
            투표하기
          </Button>
        </FullHeightButtonGroup>
      </Footer>
    </Page>
  );
}
