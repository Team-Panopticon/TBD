import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { getMeeting } from '../apis/meetings';
import { GetMeetingResponse } from '../apis/types';
import { getVotings, Voting } from '../apis/votes';
import { Contents, Footer, Header, HeaderContainer, Page } from '../components/pageLayout';
import { FullHeightButtonGroup } from '../components/styled';
import { UserList } from '../components/UserList/UserList';
import { VoteTable } from '../components/VoteTable/VoteTable';
import { useMeetingView } from '../hooks/useMeetingView';
import { currentUserState } from '../stores/currentUser';
import { votingsState } from '../stores/voting';

export function MeetingView() {
  const setVotings = useSetRecoilState<Voting[]>(votingsState);
  const currentUser = useRecoilValue(currentUserState);
  const [meeting, setMeeting] = useState<GetMeetingResponse>();
  const navigate = useNavigate();
  const { meetingId } = useParams();

  const { handleClickUserList, handleClickVoteTable, userList, voteTableDataList } =
    useMeetingView(meeting);

  useEffect(() => {
    (async () => {
      if (!meetingId) {
        return;
      }

      const data = await getVotings(meetingId);
      setVotings(data);

      const meetingData = await getMeeting(meetingId);
      setMeeting(meetingData);
    })();
  }, [setVotings, meetingId]);

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
              navigate(`/meetings/${meeting.id}/vote`);
            }}
          >
            {currentUser?.username ? '다시 투표하러 가기' : '투표하러 가기'}
          </Button>
        </FullHeightButtonGroup>
      </Footer>
    </Page>
  );
}
