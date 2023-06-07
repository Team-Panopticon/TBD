import { Alert, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { getMeeting } from '../apis/meetings';
import { GetMeetingResponse } from '../apis/types';
import { createVoting, getVotings } from '../apis/votes';
import { Contents, Footer, Header, HeaderContainer, Page } from '../components/pageLayout';
import { FullHeightButtonGroup } from '../components/styled';
import { UserList, UserListData } from '../components/UserList/UserList';
import { VoteTable } from '../components/VoteTable/VoteTable';
import { useMeetingViewVoteMode } from '../hooks/useMeetingVote';
import { currentUserState } from '../stores/currentUser';
import { currentUserVotingSlotsState } from '../stores/currentUserVotingSlots';
import { userListState, votingsState } from '../stores/voting';

interface MeetingVoteRouteParams {
  meetingId: string;
}

export function MeetingVote() {
  const { meetingId } = useParams<keyof MeetingVoteRouteParams>() as MeetingVoteRouteParams;

  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const setCurrentUserVotingSlots = useSetRecoilState(currentUserVotingSlotsState);
  const isNewUser = !currentUser;

  const [meeting, setMeeting] = useState<GetMeetingResponse>();
  const [votings, setVotings] = useRecoilState(votingsState);
  const userList = useRecoilValue(userListState);

  const navigate = useNavigate();

  const { voteTableDataList, currentUserVotingSlots, handleClickVoteTableSlot } =
    useMeetingViewVoteMode(meeting);

  useEffect(() => {
    (async () => {
      const data = await getVotings(meetingId);
      setVotings(data);

      const meetingData = await getMeeting(meetingId);
      setMeeting(meetingData);
    })();
  }, [meetingId, setVotings]);

  const handleClickUser = (checked: boolean, userListData: UserListData) => {
    if (!meeting) {
      return;
    }

    setCurrentUser({
      id: userListData.id,
      username: userListData.username,
    });

    const previousVoting = votings.find((voting) => voting.username === userListData.username);
    if (!previousVoting) {
      setCurrentUserVotingSlots([]);
      return;
    }

    const previousVotingSlots = previousVoting[meeting.type];
    setCurrentUserVotingSlots(previousVotingSlots ?? []);
  };

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
        {!isNewUser && (
          <Alert severity="warning">{`${currentUser.username}님의 투표를 수정합니다`}</Alert>
        )}
        {/* TODO: 유저 목록에서 기존유저 클릭 시 로직 반영 */}
        <UserList users={userList} onClick={handleClickUser} />
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
              navigate(`/meetings/${meetingId}`);
            }}
          >
            다음에하기
          </Button>
          <Button
            onClick={() => {
              createVoting(meetingId, {
                username: '테스트유저1',
                dateType: currentUserVotingSlots,
              });
            }}
          >
            투표하기
          </Button>
        </FullHeightButtonGroup>
      </Footer>
    </Page>
  );
}
