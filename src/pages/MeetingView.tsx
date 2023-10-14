import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Snackbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { getMeeting, issuePublicMeetingAdminToken } from '../apis/meetings';
import { Meeting } from '../apis/types';
import { getVotings, Voting } from '../apis/votes';
import { ResultPageButton } from '../components/buttons/ResultPageButton';
import { VotePageButton } from '../components/buttons/VotePageButton';
import { Contents, Footer, Header, HeaderContainer, Page } from '../components/pageLayout';
import { FlexVertical, FullHeightButtonGroup } from '../components/styled';
import { UserList } from '../components/UserList/UserList';
import { VoteTable } from '../components/VoteTable/VoteTable';
import { INPUT_PASSWORD_FINISH_EVENT, MeetingStatus, MeetingType } from '../constants/meeting';
import { useMeetingView } from '../hooks/useMeetingView';
import useShare from '../hooks/useShare';
import GreetingHands from '../images/greeting-hands.png';
import { adminTokenStateFamily } from '../stores/adminToken';
import { currentUserStateFamily } from '../stores/currentUser';
import { showVoteSuccessPopupState } from '../stores/showVoteSuccessPopup';
import { votingsState } from '../stores/voting';
import { Dropdown } from '../templates/MeetingView/Dropdown/Dropdown';
import { InputPasswordModal } from '../templates/MeetingView/InputPasswordModal';
import { PrimaryBold, VoteTableWrapper } from '../templates/MeetingView/styled';

interface MeetingViewPathParams {
  meetingId: string;
}

export function MeetingView() {
  const navigate = useNavigate();
  const { meetingId } = useParams<keyof MeetingViewPathParams>() as MeetingViewPathParams;
  const setVotings = useSetRecoilState<Voting[]>(votingsState);
  const [showVoteSuccessPopup, setShowVoteSuccessPopup] = useRecoilState(showVoteSuccessPopupState);

  const currentUser = useRecoilValue(currentUserStateFamily(meetingId));

  const [meeting, setMeeting] = useState<Meeting>();
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [adminToken, setAdminToken] = useRecoilState(adminTokenStateFamily(meetingId));

  const { openShare, setTarget } = useShare();

  const { handleClickUserList, handleClickVoteTable, userList, voteTableDataList } =
    useMeetingView(meeting);

  useEffect(() => {
    (async () => {
      if (!meetingId) {
        return;
      }

      const [votingsData, meetingData] = await Promise.all([
        getVotings(meetingId),
        getMeeting(meetingId),
      ]);

      setMeeting(meetingData);
      setVotings(votingsData);

      setTarget(meetingData);
    })();
  }, [setVotings, meetingId]);

  const handleClickSettingsButton = async (destination: string) => {
    const isLoggedInAsAdmin = adminToken !== undefined;
    if (isLoggedInAsAdmin) {
      navigate(destination);
      return;
    }

    if (meeting?.adminAccess === 'public') {
      issuePublicMeetingAdminToken(meetingId).then((token) => {
        setAdminToken(token);
        navigate(destination);
      });
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
              >
                <Typography variant="h5" fontWeight={700}>
                  {meeting.name}
                </Typography>
                {meeting.status === MeetingStatus.inProgress && (
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
        </HeaderContainer>
      </Header>
      <Contents>
        <UserList className="user-list" users={userList} onClick={handleClickUserList}>
          <UserList.Title color="primary">투표 현황</UserList.Title>
        </UserList>

        <VoteTableWrapper>
          <VoteTable
            onClick={handleClickVoteTable}
            data={voteTableDataList}
            headers={meeting.type === MeetingType.date ? ['투표 현황'] : ['점심', '저녁']}
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
          {meeting.status === MeetingStatus.inProgress ? (
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
            공유하기
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
