import { Alert, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { getMeeting } from '../apis/meetings';
import { GetMeetingResponse } from '../apis/types';
import { createVoting, getVotings, updateVoting } from '../apis/votes';
import { Contents, Footer, Header, HeaderContainer, Page } from '../components/pageLayout';
import { FullHeightButtonGroup } from '../components/styled';
import { UserList, UserListData } from '../components/UserList/UserList';
import { VoteTable } from '../components/VoteTable/VoteTable';
import { MeetingType } from '../constants/meeting';
import { useMeetingViewVoteMode } from '../hooks/useMeetingVote';
import { currentUserState } from '../stores/currentUser';
import { currentUserVotingSlotsState } from '../stores/currentUserVotingSlots';
import { showVoteSuccessPopupState } from '../stores/showVoteSuccessPopup';
import { userListState, votingsState } from '../stores/voting';
import { InputUsernameModal } from '../templates/MeetingView/InputUsernameModal';

interface MeetingVoteRouteParams {
  meetingId: string;
}

export function MeetingVote() {
  const { meetingId } = useParams<keyof MeetingVoteRouteParams>() as MeetingVoteRouteParams;

  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const resetCurrentUser = useResetRecoilState(currentUserState);
  const setCurrentUserVotingSlots = useSetRecoilState(currentUserVotingSlotsState);
  const setShowVoteSuccessPopup = useSetRecoilState(showVoteSuccessPopupState);
  const isNewUser = !currentUser;

  const [meeting, setMeeting] = useState<GetMeetingResponse>();
  const [votings, setVotings] = useRecoilState(votingsState);
  const userList = useRecoilValue(userListState);
  const [showUsernameModal, setShowUsernameModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const { voteTableDataList, currentUserVotingSlots, handleClickVoteTableSlot } =
    useMeetingViewVoteMode(meeting);

  useEffect(() => {
    (async () => {
      const votingsData = await getVotings(meetingId);
      setVotings(votingsData);

      const meetingData = await getMeeting(meetingId);
      setMeeting(meetingData);

      const currentUserVoting = votingsData.find((voting) => voting.id === currentUser?.id);
      const currentUserVotingSlots = currentUserVoting?.[meetingData.type];
      setCurrentUserVotingSlots(currentUserVotingSlots ?? []);
    })();
  }, [meetingId, setVotings, setCurrentUserVotingSlots, currentUser]);

  const handleClickUser = (checked: boolean, clickedUser: UserListData) => {
    if (!meeting) {
      return;
    }

    const isCurrentUserClicked = currentUser?.id === clickedUser.id;
    if (isCurrentUserClicked) {
      setCurrentUser(undefined);
      resetCurrentUser();
      setCurrentUserVotingSlots([]);
      return;
    }

    setCurrentUser({
      id: clickedUser.id,
      username: clickedUser.username,
    });

    const previousVoting = votings.find((voting) => voting.username === clickedUser.username);
    const previousVotingSlots = previousVoting?.[meeting.type];
    setCurrentUserVotingSlots(previousVotingSlots ?? []);
  };

  // eslint-disable-next-line @typescript-eslint/require-await
  const handleClickVote = async () => {
    if (isNewUser) {
      setShowUsernameModal(true);
      return;
    }

    // Old user
    await updateVoting({
      meetingId,
      votingId: currentUser.id,
      data: {
        username: currentUser.username,
        dateType: currentUserVotingSlots,
      },
    });
    setShowUsernameModal(false);
    setShowVoteSuccessPopup(true);
    navigate(`/meetings/${meetingId}`);
  };

  const handleUsernameConfirm = async (username: string) => {
    const voting = await createVoting({
      meetingId,
      data: {
        username,
        dateType: currentUserVotingSlots,
      },
    });

    setCurrentUser({
      id: voting.id,
      username: voting.username,
    });
    setShowUsernameModal(false);
    setShowVoteSuccessPopup(true);
    navigate(`/meetings/${meetingId}`);
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
        <UserList users={userList} onClick={handleClickUser} />
        <VoteTable
          onClick={handleClickVoteTableSlot}
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
              navigate(`/meetings/${meetingId}`);
            }}
          >
            다음에하기
          </Button>
          <Button
            onClick={() => {
              handleClickVote();
            }}
          >
            투표하기
          </Button>
        </FullHeightButtonGroup>
      </Footer>
      <InputUsernameModal
        show={showUsernameModal}
        usernameList={userList.map((user) => user.username)}
        onConfirm={handleUsernameConfirm}
        onCancel={() => setShowUsernameModal(false)}
      />
    </Page>
  );
}
