import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Snackbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { getMeeting } from '../apis/meetings';
import { GetMeetingResponse } from '../apis/types';
import { getVotings, Voting } from '../apis/votes';
import { Contents, Footer, Header, HeaderContainer, Page } from '../components/pageLayout';
import { FlexVertical, FullHeightButtonGroup } from '../components/styled';
import { UserList } from '../components/UserList/UserList';
import { VoteTable } from '../components/VoteTable/VoteTable';
import { MeetingType } from '../constants/meeting';
import { useMeetingView } from '../hooks/useMeetingView';
import GreetingHands from '../images/greeting-hands.png';
import { adminTokenState } from '../stores/adminToken';
import { currentUserState } from '../stores/currentUser';
import { showVoteSuccessPopupState } from '../stores/showVoteSuccessPopup';
import { votingsState } from '../stores/voting';
import { Dropdown } from '../templates/MeetingView/Dropdown/Dropdown';
import { InputPasswordModal } from '../templates/MeetingView/InputPasswordModal';
import {
  NoUserList,
  PrimaryBold,
  UserListLabel,
  UserListWrapper,
  VoteTableWrapper,
} from '../templates/MeetingView/styled';

interface MeetingViewPathParams {
  meetingId: string;
}

export function MeetingView() {
  const navigate = useNavigate();
  const { meetingId } = useParams<keyof MeetingViewPathParams>() as MeetingViewPathParams;
  const setVotings = useSetRecoilState<Voting[]>(votingsState);
  const [showVoteSuccessPopup, setShowVoteSuccessPopup] = useRecoilState(showVoteSuccessPopupState);
  const currentUser = useRecoilValue(currentUserState);

  const [meeting, setMeeting] = useState<GetMeetingResponse>();
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const adminToken = useRecoilValue(adminTokenState);

  const { handleClickUserList, handleClickVoteTable, userList, voteTableDataList } =
    useMeetingView(meeting);

  useEffect(() => {
    (async () => {
      if (!meetingId) {
        return;
      }

      const data = await getVotings(meetingId);
      setVotings(data);

      const meetingData = await getMeeting(meetingId);
      setMeeting(meetingData);
    })();
  }, [setVotings, meetingId]);

  const handleClickConfirmButton = () => {
    const isLoggedInAsAdmin = adminToken !== undefined;
    if (isLoggedInAsAdmin) {
      navigate(`/meetings/${meetingId}/confirm`);
      return;
    }

    // Not yet logged in as admin
    setShowPasswordModal(true);
  };

  const handlePasswordModalConfirm = () => {
    navigate(`/meetings/${meetingId}/confirm`);
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
                <Typography variant="h5" fontWeight={300}>
                  {meeting.name}
                </Typography>
                <Dropdown
                  onClickConfirmButton={() => {
                    // TODO: 확정하기 api 연결
                  }}
                  onClickEditButton={() => {
                    // TODO: 수정하기 api 연결
                  }}
                />
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
        <UserListWrapper>
          <UserListLabel>참석자 목록</UserListLabel>
          {userList.length ? (
            <UserList className="user-list" users={userList} onClick={handleClickUserList} />
          ) : (
            <NoUserList>아직 아무도 참석할 수 있는 사람이 없어요. 🥲</NoUserList>
          )}
        </UserListWrapper>
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
          <Button
            color="primary"
            onClick={() => {
              navigate(`/meetings/${meeting.id}/vote`);
            }}
          >
            {currentUser?.username ? '다시 투표하러 가기' : '투표하러 가기'}
          </Button>
          <Button color="transPrimary">공유하기</Button>
        </FullHeightButtonGroup>
      </Footer>
      <InputPasswordModal
        show={showPasswordModal}
        onConfirm={handlePasswordModalConfirm}
        onCancel={() => {
          setShowPasswordModal(false);
        }}
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
