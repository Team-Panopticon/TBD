import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { getMeeting } from '../apis/meetings';
import { getVotings, Voting, VotingSlot } from '../apis/votes';
import { Contents, Footer, Header, HeaderContainer, Page } from '../components/pageLayout';
import { FullHeightButtonGroup } from '../components/styled';
import { UserList } from '../components/UserList/UserList';
import { VoteTable, VoteTableVoting } from '../components/VoteTable/VoteTable';
import { MeetingType } from '../constants/meeting';
import { useMeetingView } from '../hooks/useMeetingView';
import { isSameSlot } from '../hooks/useMeetingVote';
import { votingsState } from '../stores/voting';

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

  const setVotings = useSetRecoilState<Voting[]>(votingsState);
  const {
    handleClickVoteTable: handleVoteTableClickHightlight,
    userList,
    voteTableDataList,
  } = useMeetingView(meeting);

  const [selectedSlot, setSelectedSlot] = useState<VotingSlot>();

  // TODO: Recoil로 비동기 데이터 가져오는 것 대체
  useEffect(() => {
    (async () => {
      if (!meetingId) {
        return;
      }

      const data = await getVotings(meetingId);
      setVotings(data);
    })();
  }, [setVotings, meetingId]);

  if (isLoading || isError) {
    return null;
  }

  const handleClickVoteTable = (
    date: Dayjs,
    checked: boolean,
    target: VoteTableVoting,
    slot: VotingSlot,
  ) => {
    if (selectedSlot && isSameSlot(selectedSlot, slot)) {
      setSelectedSlot(undefined);
    } else {
      setSelectedSlot(slot);
    }
    handleVoteTableClickHightlight(date, checked, target, slot);
  };

  return (
    <Page>
      <Header>
        <HeaderContainer>
          <h1>{meeting.name}</h1>
        </HeaderContainer>
      </Header>
      <Contents>
        <UserList users={userList} />
        <VoteTable
          onClick={handleClickVoteTable}
          data={voteTableDataList}
          headers={meeting.type === MeetingType.date ? ['투표 현황'] : ['점심', '저녁']}
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
              console.log('취소하기');
            }}
          >
            취소하기
          </Button>
          <Button
            color="primary"
            disabled={!selectedSlot}
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
