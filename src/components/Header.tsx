import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo_nobg from '../assets/round.png';
import { MeetingStatus } from '../constants/meeting';
import { useMeetingViewHeader } from '../hooks/MeetingView/useMeetingViewHeader';
import { Dropdown } from '../templates/MeetingView/Dropdown/Dropdown';
import { InputPasswordModal } from '../templates/MeetingView/InputPasswordModal';
export const Header = () => {
  const [show, setShow] = useState(false);
  const handleShowDropdown = () => {
    setShow(true);
  };

  const {
    meeting,
    meetingId,
    showPasswordModal,
    showVoteSuccessPopup,
    setShowVoteSuccessPopup,
    handleClickSettingsButton,
    handlePasswordModalCancel,
    handlePasswordModalConfirm,
  } = useMeetingViewHeader();
  const nav = useNavigate();

  const menuList = [
    ...(meeting?.status === MeetingStatus.inProgress
      ? [
          {
            name: '모임 확정',
            icon: <></>,
            onClick: () => {
              handleClickSettingsButton(`/meetings/${meetingId}/confirm`);
            },
          },
          {
            name: '모임 수정',
            icon: <></>,
            onClick: () => {
              handleClickSettingsButton(`/meetings/${meetingId}/modify`);
            },
          },
        ]
      : []),
    {
      name: '새로운 모임 만들기',
      icon: <></>,
      onClick: () => {
        nav(`/meetings/new`);
      },
    },
  ];

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <img
          src={logo_nobg}
          alt="로고"
          style={{
            width: 'auto',
            height: '32px',
          }}
        />
        <h1>{meeting?.name}</h1>
        <MenuIconButton onClick={handleShowDropdown}></MenuIconButton>
      </HeaderContainer>
      <Dropdown show={show} setShow={setShow} menuList={menuList}></Dropdown>
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
    </HeaderWrapper>
  );
};

export const EditHeaderBox = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  gap: '8px',
  padding: '32px 0',
  alignItems: 'center',
  justifyContent: 'flex-start',
});

export const EditTemplateHeader = ({ children }: { children: ReactNode }) => {
  return (
    <HeaderWrapper>
      <EditHeaderBox>{children}</EditHeaderBox>
    </HeaderWrapper>
  );
};
const MenuIconButton = styled(MenuIcon)(({ theme }) => ({
  borderColor: theme.palette.secondary.dark,
  color: theme.palette.secondary.dark,
  borderRadius: '6px',
  padding: '4px',
  width: '32px',
  height: '32px',
}));

const HeaderWrapper = styled('header')`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex: 0;
`;

const HeaderContainer = styled('div')`
  width: 100%;
  height: 64px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  h1 {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
  }

  h2 {
    margin-top: 4px;
  }
`;
