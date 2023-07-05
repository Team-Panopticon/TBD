import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getMeeting } from '../apis/meetings';
import { Contents, Footer, Header, HeaderContainer, Page } from '../components/pageLayout';
import { FullHeightButtonGroup } from '../components/styled';

interface MeetingConfirmPathParams {
  meetingId: string;
}

export function MeetingConfirm() {
  const { meetingId } = useParams<keyof MeetingConfirmPathParams>() as MeetingConfirmPathParams;
  const {
    data: meeting,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['meeting', meetingId],
    queryFn: () => getMeeting(meetingId),
  });

  if (isLoading || isError) {
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
        {/* <UserList users={userList} onClick={handleClickUserList} />
        <VoteTable
          onClick={handleClickVoteTable}
          data={voteTableDataList}
          headers={meeting.type === MeetingType.date ? ['투표 현황'] : ['점심', '저녁']}
        /> */}
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
              console.log('취소하기');
            }}
          >
            취소하기
          </Button>
          <Button
            color="primary"
            onClick={() => {
              console.log('모임시간 확정');
            }}
          >
            모임시간 확정
          </Button>
        </FullHeightButtonGroup>
      </Footer>
    </Page>
  );
}
