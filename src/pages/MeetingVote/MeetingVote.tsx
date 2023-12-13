import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { createVoting, updateVoting } from '../../apis/votes';
import WritingHands from '../../assets/writing.svg';
import { Loading } from '../../components/Loading';
import { Contents, Footer, Header, HeaderContainer, Page } from '../../components/pageLayout';
import { FlexVertical, FullHeightButtonGroup } from '../../components/styled';
import { UserList, UserListData } from '../../components/UserList/UserList';
import { VoteTable } from '../../components/VoteTable/VoteTable';
import { MeetingType } from '../../constants/meeting';
import { useMeeting } from '../../hooks/useMeeting';
import { useMeetingViewVoteMode } from '../../hooks/useMeetingVote';
import { useProgress } from '../../hooks/useProgress';
import { useVotings } from '../../hooks/useVotings';
import { currentUserStateFamily } from '../../stores/currentUser';
import { currentUserVotingSlotsState } from '../../stores/currentUserVotingSlots';
import { showVoteSuccessPopupState } from '../../stores/showVoteSuccessPopup';
import { userListState, votingsState as votingRecoilState } from '../../stores/voting';
import { InputUsernameModal } from '../../templates/MeetingView/InputUsernameModal';
import { PrimaryBold, VoteTableWrapper } from '../../templates/MeetingView/styled';

function MeetingVote() {
  const [searchParams] = useSearchParams();
  const { meeting, meetingId, isFetching: isMeetingFetching } = useMeeting();
  const { votings, isFetching: isVotingsFetcing, invalidateVotings } = useVotings();
  const isFetching = isMeetingFetching && isVotingsFetcing;

  const [currentUser, setCurrentUser] = useRecoilState(currentUserStateFamily(meetingId));
  const resetCurrentUser = useResetRecoilState(currentUserStateFamily(meetingId));
  const setCurrentUserVotingSlots = useSetRecoilState(currentUserVotingSlotsState);
  const setShowVoteSuccessPopup = useSetRecoilState(showVoteSuccessPopupState);
  const isNewUser = !currentUser;

  const [votingsState, setVotingsState] = useRecoilState(votingRecoilState);
  const userList = useRecoilValue(userListState);
  const checkedUserList = userList.map((user) => ({
    ...user,
    checked: user.id === currentUser?.id,
  }));

  const [showUsernameModal, setShowUsernameModal] = useState<boolean>(false);

  const navigate = useNavigate();
  const { show, hide } = useProgress();

  const { mutate: updateVotingMutate } = useMutation({
    mutationFn: updateVoting,
    onMutate: () => show(),
    onSuccess: async () => {
      setShowUsernameModal(false);
      setShowVoteSuccessPopup(true);
      await invalidateVotings();
      navigate(`/meetings/${meetingId}`);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorResponseData = error.response?.data as { message: string };
        alert(errorResponseData?.message);
      } else {
        alert(error);
      }
    },
    onSettled: () => hide(),
  });

  const { mutate: createVotingMutate } = useMutation({
    mutationFn: createVoting,
    onMutate: () => show(),
    onSuccess: async (res) => {
      setCurrentUser({
        id: res.id,
        username: res.username,
      });
      setShowUsernameModal(false);
      setShowVoteSuccessPopup(true);
      await invalidateVotings();
      navigate(`/meetings/${meetingId}`);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const errorResponseData = error.response?.data as { message: string };
        alert(errorResponseData?.message);
      } else {
        alert(error);
      }
    },
    onSettled: () => hide(),
  });

  const {
    voteTableDataList,
    currentUserVotingSlots,
    handleClickVoteTableSlot,
    handleClickVoteTableDate,
  } = useMeetingViewVoteMode(meeting);

  useEffect(() => {
    const isFromSharedURL = searchParams.get('ref') === 'share';
    if (isFromSharedURL && !isNewUser) {
      navigate(`/meetings/${meetingId}`);
    }
  }, [isNewUser, meetingId, navigate, searchParams]);

  useEffect(() => {
    if (meeting && votings) {
      setVotingsState(votings);
      const currentUserVoting = votings.find((voting) => voting.id === currentUser?.id);
      const currentUserVotingSlots = currentUserVoting?.[meeting.type];
      setCurrentUserVotingSlots(currentUserVotingSlots ?? []);
    }
  }, [meetingId, setVotingsState, setCurrentUserVotingSlots, currentUser, votings, meeting]);

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

    const previousVoting = votingsState.find((voting) => voting.username === clickedUser.username);
    const previousVotingSlots = previousVoting?.[meeting.type];
    setCurrentUserVotingSlots(previousVotingSlots ?? []);
  };

  // eslint-disable-next-line @typescript-eslint/require-await
  const handleClickVote = async () => {
    if (!meeting) {
      return;
    }

    if (isNewUser) {
      setShowUsernameModal(true);
      return;
    }

    // Old user
    updateVotingMutate({
      meetingId,
      votingId: currentUser.id,
      data: {
        username: currentUser.username,
        [meeting.type]: currentUserVotingSlots,
      },
    });
  };

  const handleUsernameConfirm = (username: string) => {
    if (!meeting) {
      return;
    }

    createVotingMutate({
      meetingId,
      data: {
        username,
        [meeting.type]: currentUserVotingSlots,
      },
    });
  };

  if (isFetching) {
    return <Loading />;
  }

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
              <FlexVertical>
                {currentUser ? (
                  <Typography variant="h6" fontWeight={400} align="center">
                    <PrimaryBold className="primary-bold">{currentUser.username}</PrimaryBold>님의
                    투표를 수정합니다
                  </Typography>
                ) : (
                  <Typography
                    variant="h6"
                    fontWeight={400}
                    style={{ wordBreak: 'keep-all' }}
                    align="center"
                  >
                    투표하신 적이 있으면 참석자 목록에서 아이디를 눌러주세요
                  </Typography>
                )}
              </FlexVertical>
            </FlexVertical>
          </FlexVertical>
        </HeaderContainer>
      </Header>
      <Contents>
        <UserList
          className="user-list"
          users={checkedUserList}
          onClick={handleClickUser}
          selectedTooltipText="새로운 유저로 투표하려면 다시 클릭해주세요"
        >
          <UserList.Title color="primary">투표 현황</UserList.Title>
        </UserList>
        <VoteTableWrapper>
          <VoteTable
            onDateClick={handleClickVoteTableDate}
            onSlotClick={handleClickVoteTableSlot}
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
            다음에
          </Button>
          <Button
            onClick={() => {
              handleClickVote();
            }}
          >
            투표
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

export default MeetingVote;
