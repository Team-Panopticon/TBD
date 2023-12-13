import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import { useMutation } from '@tanstack/react-query';
import { UIEvent, useEffect, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { issuePublicMeetingAdminToken } from '../../apis/meetings';
import { Voting } from '../../apis/votes';
import { ScrollDownFloatingButton } from '../../components/buttons/ScrollDownFloatingButton';
import { Loading } from '../../components/Loading';
import { Header, HeaderContainer, Page } from '../../components/pageLayout';
import { FlexVertical } from '../../components/styled';
import { INPUT_PASSWORD_FINISH_EVENT, MeetingStatus } from '../../constants/meeting';
import { useMeeting } from '../../hooks/useMeeting';
import { useProgress } from '../../hooks/useProgress';
import { useVotings } from '../../hooks/useVotings';
import GreetingHands from '../../images/greeting-hands.png';
import { adminTokenStateFamily } from '../../stores/adminToken';
import { currentUserStateFamily } from '../../stores/currentUser';
import { showVoteSuccessPopupState } from '../../stores/showVoteSuccessPopup';
import { votingsState } from '../../stores/voting';
import { Dropdown } from '../../templates/MeetingView/Dropdown/Dropdown';
import { InputPasswordModal } from '../../templates/MeetingView/InputPasswordModal';
import MeetingViewContents from '../../templates/MeetingView/MeetingViewContents';
import MeetingViewFooter from '../../templates/MeetingView/MeetingViewFooter';
import { PrimaryBold } from '../../templates/MeetingView/styled';

function MeetingView() {
  const { meeting, meetingId, isFetching: isMeetingFetching } = useMeeting();
  const { votings, isFetching: isVotingsFetcing } = useVotings();
  const isFetching = isMeetingFetching && isVotingsFetcing;

  const navigate = useNavigate();
  const setVotings = useSetRecoilState<Voting[]>(votingsState);
  const [showVoteSuccessPopup, setShowVoteSuccessPopup] = useRecoilState(showVoteSuccessPopupState);
  const pageElementRef = useRef<HTMLDivElement>(null);

  const currentUser = useRecoilValue(currentUserStateFamily(meetingId));

  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [adminToken, setAdminToken] = useRecoilState(adminTokenStateFamily(meetingId));
  const [hasMoreBottomScroll, setHasMoreBottomScroll] = useState<boolean>(false);

  const { show, hide } = useProgress();

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
    if (votings) {
      setVotings(votings);
    }
  }, [meeting, votings, setVotings, meetingId]);

  useResizeDetector({
    targetRef: pageElementRef,
    onResize: () => {
      if (pageElementRef.current === null) {
        return;
      }
      const { scrollTop, scrollHeight, clientHeight } = pageElementRef.current;
      setHasMoreBottomScroll(scrollTop + clientHeight < scrollHeight);
    },
  });

  const handleClickSettingsButton = async (destination: string) => {
    const isLoggedInAsAdmin = adminToken !== undefined;
    if (isLoggedInAsAdmin) {
      navigate(destination);
      return;
    }

    if (meeting?.adminAccess === 'public') {
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

  const handlePageScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    setHasMoreBottomScroll(scrollTop + clientHeight < scrollHeight);
  };

  const handleScollDownButtonClick = () => {
    if (!pageElementRef.current) {
      return;
    }

    const viewportHeight = window.innerHeight;
    const scrollAmount = viewportHeight * 0.5;

    pageElementRef.current.scrollTo({
      top: pageElementRef.current.scrollTop + scrollAmount,
      behavior: 'smooth',
    });
  };

  if (isFetching) {
    return <Loading />;
  }

  if (!meeting) {
    return null;
  }

  return (
    <Page onScroll={handlePageScroll} ref={pageElementRef}>
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
      <MeetingViewContents />
      <MeetingViewFooter />
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
      <ScrollDownFloatingButton onClick={handleScollDownButtonClick} show={hasMoreBottomScroll} />
    </Page>
  );
}

export default MeetingView;
