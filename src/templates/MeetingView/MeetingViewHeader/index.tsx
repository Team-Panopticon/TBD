import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';

import { Header, HeaderContainer } from '../../../components/pageLayout';
import { FlexVertical } from '../../../components/styled';
import { MeetingStatus } from '../../../constants/meeting';
import { useMeetingViewHeader } from '../../../hooks/MeetingView/useMeetingViewHeader';
import GreetingHands from '../../../images/greeting-hands.png';
import { Dropdown } from '../Dropdown/Dropdown';
import { InputPasswordModal } from '../InputPasswordModal';
import { PrimaryBold } from '../styled';

const MeetingViewHeader = () => {
  const {
    currentUser,
    meeting,
    meetingId,
    showPasswordModal,
    showVoteSuccessPopup,
    setShowVoteSuccessPopup,
    handleClickSettingsButton,
    handlePasswordModalCancel,
    handlePasswordModalConfirm,
  } = useMeetingViewHeader();

  return (
    <>
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
                  {meeting?.name}
                </Typography>
                {meeting?.status === MeetingStatus.inProgress && (
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
    </>
  );
};

export default MeetingViewHeader;
