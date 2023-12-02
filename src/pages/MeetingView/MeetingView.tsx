import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { issuePublicMeetingAdminToken } from '../../apis/meetings';
import { Voting } from '../../apis/votes';
import { ResultPageButton } from '../../components/buttons/ResultPageButton';
import { VotePageButton } from '../../components/buttons/VotePageButton';
import { Loading } from '../../components/Loading';
import { Contents, Footer, Header, Page } from '../../components/pageLayout';
import { FlexVertical, FullHeightButtonGroup } from '../../components/styled';
import { UserList } from '../../components/UserList/UserList';
import { VoteTable } from '../../components/VoteTable/VoteTable';
import { INPUT_PASSWORD_FINISH_EVENT, MeetingStatus, MeetingType } from '../../constants/meeting';
import { useMeetingData } from '../../hooks/useMeetingData';
import { useMeetingView } from '../../hooks/useMeetingView';
import { useProgress } from '../../hooks/useProgress';
import useShare from '../../hooks/useShare';
import GreetingHands from '../../images/greeting-hands.png';
import { adminTokenStateFamily } from '../../stores/adminToken';
import { currentUserStateFamily } from '../../stores/currentUser';
import { showVoteSuccessPopupState } from '../../stores/showVoteSuccessPopup';
import { votingsState } from '../../stores/voting';
import { Dropdown } from '../../templates/MeetingView/Dropdown/Dropdown';
import { InputPasswordModal } from '../../templates/MeetingView/InputPasswordModal';
import { PrimaryBold, VoteTableWrapper } from '../../templates/MeetingView/styled';

interface MeetingViewPathParams {
  meetingId: string;
}

function MeetingView() {
  const navigate = useNavigate();
  const { meetingId } = useParams<keyof MeetingViewPathParams>() as MeetingViewPathParams;
  const setVotings = useSetRecoilState<Voting[]>(votingsState);
  const [showVoteSuccessPopup, setShowVoteSuccessPopup] = useRecoilState(showVoteSuccessPopupState);

  const currentUser = useRecoilValue(currentUserStateFamily(meetingId));

  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [adminToken, setAdminToken] = useRecoilState(adminTokenStateFamily(meetingId));

  const { openShare, setTarget } = useShare();
  const { show, hide } = useProgress();

  const { data, isLoading } = useMeetingData(meetingId);

  const { handleClickUserList, handleClickVoteTable, userList, voteTableDataList } = useMeetingView(
    data.meeting,
  );

  const { mutate } = useMutation({
    mutationFn: async (params: { meetingId: string; destination: string }) =>
      issuePublicMeetingAdminToken(params.meetingId),
    onMutate: () => show(),
    onSuccess: (token, { destination }) => {
      setAdminToken(token);
      navigate(destination);
    },
    onSettled: () => hide(),
  });

  useEffect(() => {
    if (data.meeting && data.votings) {
      setVotings(data.votings);
      setTarget(data.meeting);
    }
  }, [data.meeting, data.votings, setVotings, meetingId]);

  const handleClickSettingsButton = async (destination: string) => {
    const isLoggedInAsAdmin = adminToken !== undefined;
    if (isLoggedInAsAdmin) {
      navigate(destination);
      return;
    }

    if (data.meeting?.adminAccess === 'public') {
      mutate({ meetingId, destination });
      return;
    }

    // Private meeting AND Not yet logged in as admin
    const isInputPasswordResolved = await openInputPasswordModal();

    if (isInputPasswordResolved) {
      navigate(destination);
    }
  };

  // Create a promise that resolves when the user closes the password input modal
  const openInputPasswordModal = () => {
    setShowPasswordModal(true);

    const inputPasswordFinishPromise = new Promise((resolve, reject) => {
      addEventListener(
        INPUT_PASSWORD_FINISH_EVENT,
        (event) => resolve((event as CustomEvent).detail),
        {
          once: true,
        },
      );
    });

    return inputPasswordFinishPromise;
  };

  const handlePasswordModalConfirm = () => {
    dispatchEvent(new CustomEvent(INPUT_PASSWORD_FINISH_EVENT, { detail: true }));
  };

  const handlePasswordModalCancel = () => {
    dispatchEvent(new CustomEvent(INPUT_PASSWORD_FINISH_EVENT, { detail: false }));
    setShowPasswordModal(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!data.meeting || !voteTableDataList) {
    return null;
  }

  return (
    <Page>
      <Header>
        <FlexVertical flex={1} alignItems={'center'} gap={1}>
          <FlexVertical flex={1} gap={1} width={'100%'}>
            <Box
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Typography variant="h5" fontWeight={700}>
                {data.meeting.name}
              </Typography>
              {data.meeting.status === MeetingStatus.inProgress && (
                <Dropdown
                  onClickConfirmButton={() =>
                    handleClickSettingsButton(`/meetings/${meetingId}/confirm`)
                  }
                  onClickEditButton={() =>
                    handleClickSettingsButton(`/meetings/${meetingId}/modify`)
                  }
                />
              )}
            </Box>
            <FlexVertical alignItems={'center'}>
              <img height={110} src={GreetingHands} alt="" />
            </FlexVertical>
            {currentUser ? (
              <Typography variant="h5" fontWeight={500} align="center">
                <PrimaryBold className="primary-bold">{currentUser.username}</PrimaryBold>님
                안녕하세요
              </Typography>
            ) : null}
          </FlexVertical>
        </FlexVertical>
      </Header>
      <Contents>
        <UserList className="user-list" users={userList} onClick={handleClickUserList} isSticky>
          <UserList.Title color="primary">투표 현황</UserList.Title>
        </UserList>

        <VoteTableWrapper>
          <VoteTable
            onSlotClick={handleClickVoteTable}
            data={voteTableDataList}
            headers={data.meeting.type === MeetingType.date ? ['투표 현황'] : ['점심', '저녁']}
            className="vote-table"
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
          {data.meeting.status === MeetingStatus.inProgress ? (
            <VotePageButton meetingId={meetingId} isLoggedIn={!!currentUser?.username} />
          ) : (
            <ResultPageButton meetingId={meetingId} />
          )}
          <Button
            color="transPrimary"
            onClick={() => {
              openShare();
            }}
          >
            공유
          </Button>
        </FullHeightButtonGroup>
      </Footer>
      <InputPasswordModal
        meetingId={meetingId}
        show={showPasswordModal}
        onConfirm={handlePasswordModalConfirm}
        onCancel={handlePasswordModalCancel}
      />
      <Snackbar
        open={showVoteSuccessPopup}
        autoHideDuration={5000}
        onClose={() => {
          setShowVoteSuccessPopup(false);
        }}
        message="투표해주셔서 감사합니다!"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => {
              setShowVoteSuccessPopup(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </Page>
  );
}

export default MeetingView;
