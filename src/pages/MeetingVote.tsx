import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { getMeeting } from '../apis/meetings';
import { GetMeetingResponse } from '../apis/types';
import { createVoting, getVotings, updateVoting } from '../apis/votes';
import WritingHands from '../assets/writing.svg';
import { Contents, Footer, Header, HeaderContainer, Page } from '../components/pageLayout';
import { FlexVertical, FullHeightButtonGroup } from '../components/styled';
import { UserList, UserListData } from '../components/UserList/UserList';
import { VoteTable } from '../components/VoteTable/VoteTable';
import { MeetingType } from '../constants/meeting';
import { useMeetingViewVoteMode } from '../hooks/useMeetingVote';
import { currentUserStateFamily } from '../stores/currentUser';
import { currentUserVotingSlotsState } from '../stores/currentUserVotingSlots';
import { showVoteSuccessPopupState } from '../stores/showVoteSuccessPopup';
import { userListState, votingsState } from '../stores/voting';
import { InputUsernameModal } from '../templates/MeetingView/InputUsernameModal';
import {
  NoUserList,
  PrimaryBold,
  UserListLabel,
  UserListWrapper,
  VoteTableWrapper,
} from '../templates/MeetingView/styled';

interface MeetingVoteRouteParams {
  meetingId: string;
}

export function MeetingVote() {
  const { meetingId } = useParams<keyof MeetingVoteRouteParams>() as MeetingVoteRouteParams;

  const [currentUser, setCurrentUser] = useRecoilState(currentUserStateFamily(meetingId));
  const resetCurrentUser = useResetRecoilState(currentUserStateFamily(meetingId));
  const setCurrentUserVotingSlots = useSetRecoilState(currentUserVotingSlotsState);
  const setShowVoteSuccessPopup = useSetRecoilState(showVoteSuccessPopupState);
  const isNewUser = !currentUser;

  const [meeting, setMeeting] = useState<GetMeetingResponse>();
  const [votings, setVotings] = useRecoilState(votingsState);
  const userList = useRecoilValue(userListState);
  const checkedUserList = userList.map((user) => ({
    ...user,
    checked: user.id === currentUser?.id,
  }));

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
          <FlexVertical flex={1} alignItems={'center'} gap={1}>
            <FlexVertical flex={1} gap={1} width={'100%'}>
              <Box
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={1}
              >
                <Typography variant="h5" fontWeight={700}>
                  {meeting.name}
                </Typography>
              </Box>
              <FlexVertical alignItems={'center'}>
                <img height={110} src={WritingHands} alt="" />
              </FlexVertical>
              <FlexVertical height={64}>
                {currentUser ? (
                  <Typography variant="h6" fontWeight={400} align="center">
                    <PrimaryBold className="primary-bold">{currentUser.username}</PrimaryBold>님의
                    투표를 수정합니다
                  </Typography>
                ) : (
                  <Typography variant="h6" fontWeight={400} align="center">
                    투표하신 적이 있으면 참석자 목록에서 아이디를 눌러주세요
                  </Typography>
                )}
              </FlexVertical>
            </FlexVertical>
          </FlexVertical>
        </HeaderContainer>
      </Header>
      <Contents>
        <UserListWrapper>
          <UserListLabel>참석자 목록</UserListLabel>
          {userList.length > 0 ? (
            <UserList className="user-list" users={checkedUserList} onClick={handleClickUser} />
          ) : (
            <NoUserList>아직 아무도 참석할 수 있는 사람이 없어요</NoUserList>
          )}
        </UserListWrapper>
        <VoteTableWrapper>
          <VoteTable
            onClick={handleClickVoteTableSlot}
            data={voteTableDataList}
            headers={meeting.type === MeetingType.date ? ['투표 현황'] : ['점심', '저녁']}
          />
        </VoteTableWrapper>
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
