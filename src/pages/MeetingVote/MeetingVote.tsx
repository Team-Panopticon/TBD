import Button from '@mui/material/Button';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { createVoting, updateVoting } from '../../apis/votes';
import { Loading } from '../../components/Loading';
import { Footer, Page } from '../../components/pageLayout';
import { FullHeightButtonGroup } from '../../components/styled';
import { UserList, UserListData } from '../../components/UserList/UserList';
import { VoteTable } from '../../components/VoteTable/VoteTable';
import { MeetingType } from '../../constants/meeting';
import { useMeetingData } from '../../hooks/useMeetingData';
import { useMeetingViewVoteMode } from '../../hooks/useMeetingVote';
import { useProgress } from '../../hooks/useProgress';
import { currentUserStateFamily } from '../../stores/currentUser';
import { currentUserVotingSlotsState } from '../../stores/currentUserVotingSlots';
import { showVoteSuccessPopupState } from '../../stores/showVoteSuccessPopup';
import { userListState, votingsState } from '../../stores/voting';
import { InputUsernameModal } from '../../templates/MeetingView/InputUsernameModal';
import { VoteTableWrapper } from '../../templates/MeetingView/styled';

interface MeetingVoteRouteParams {
  meetingId: string;
}

function MeetingVote() {
  const [searchParams] = useSearchParams();
  const { meetingId } = useParams<keyof MeetingVoteRouteParams>() as MeetingVoteRouteParams;

  const [currentUser, setCurrentUser] = useRecoilState(currentUserStateFamily(meetingId));
  const resetCurrentUser = useResetRecoilState(currentUserStateFamily(meetingId));
  const setCurrentUserVotingSlots = useSetRecoilState(currentUserVotingSlotsState);
  const setShowVoteSuccessPopup = useSetRecoilState(showVoteSuccessPopupState);
  const isNewUser = !currentUser;

  const [votings, setVotings] = useRecoilState(votingsState);
  const userList = useRecoilValue(userListState);
  const checkedUserList = userList.map((user) => ({
    ...user,
    checked: user.id === currentUser?.id,
  }));

  const [showUsernameModal, setShowUsernameModal] = useState<boolean>(false);

  const { data, isLoading } = useMeetingData(meetingId);

  const navigate = useNavigate();
  const { show, hide } = useProgress();

  const { mutate: updateVotingMutate } = useMutation({
    mutationFn: updateVoting,
    onMutate: () => show(),
    onSuccess: () => {
      setShowUsernameModal(false);
      setShowVoteSuccessPopup(true);
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
    onSuccess: (res) => {
      setCurrentUser({
        id: res.id,
        username: res.username,
      });
      setShowUsernameModal(false);
      setShowVoteSuccessPopup(true);
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
  } = useMeetingViewVoteMode(data.meeting);

  useEffect(() => {
    const isFromSharedURL = searchParams.get('ref') === 'share';
    if (isFromSharedURL && !isNewUser) {
      navigate(`/meetings/${meetingId}`);
    }
  }, [isNewUser, meetingId, navigate, searchParams]);

  useEffect(() => {
    if (data.meeting && data.votings) {
      setVotings(data.votings);
      const currentUserVoting = data.votings.find((voting) => voting.id === currentUser?.id);
      const currentUserVotingSlots = currentUserVoting?.[data.meeting.type];
      setCurrentUserVotingSlots(currentUserVotingSlots ?? []);
    }
  }, [meetingId, setVotings, setCurrentUserVotingSlots, currentUser, data.votings, data.meeting]);

  const handleClickUser = (checked: boolean, clickedUser: UserListData) => {
    if (!data.meeting) {
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
    const previousVotingSlots = previousVoting?.[data.meeting.type];
    setCurrentUserVotingSlots(previousVotingSlots ?? []);
  };

  // eslint-disable-next-line @typescript-eslint/require-await
  const handleClickVote = async () => {
    if (!data.meeting) {
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
        [data.meeting.type]: currentUserVotingSlots,
      },
    });
  };

  const handleUsernameConfirm = (username: string) => {
    if (!data.meeting) {
      return;
    }

    createVotingMutate({
      meetingId,
      data: {
        username,
        [data.meeting.type]: currentUserVotingSlots,
      },
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!data.meeting || !voteTableDataList) {
    return null;
  }

  return (
    <Page>
      <>
        <UserList
          className="user-list"
          users={checkedUserList}
          onClick={handleClickUser}
          selectedTooltipText="새로운 유저로 투표하려면 다시 클릭해주세요"
          isSticky
        >
          <UserList.Title color="primary">투표 현황</UserList.Title>
        </UserList>
        <VoteTableWrapper>
          <VoteTable
            onDateClick={handleClickVoteTableDate}
            onSlotClick={handleClickVoteTableSlot}
            data={voteTableDataList}
            headers={data.meeting.type === MeetingType.date ? ['투표 현황'] : ['점심', '저녁']}
          />
        </VoteTableWrapper>
      </>
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
