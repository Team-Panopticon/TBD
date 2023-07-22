import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { getMeeting } from '../apis/meetings';
import { GetMeetingResponse } from '../apis/types';
import { getVotings, Voting } from '../apis/votes';
import { Contents, Footer, Header, HeaderContainer, Page } from '../components/pageLayout';
import { FullHeightButtonGroup } from '../components/styled';
import { UserList } from '../components/UserList/UserList';
import { VoteTable } from '../components/VoteTable/VoteTable';
import { MeetingType } from '../constants/meeting';
import { useMeetingView } from '../hooks/useMeetingView';
import { adminTokenState } from '../stores/adminToken';
import { currentUserStateOf } from '../stores/currentUser';
import { showVoteSuccessPopupState } from '../stores/showVoteSuccessPopup';
import { votingsState } from '../stores/voting';
import { Dropdown } from '../templates/MeetingView/Dropdown/Dropdown';
import { InputPasswordModal } from '../templates/MeetingView/InputPasswordModal';

interface MeetingViewPathParams {
  meetingId: string;
}

export function MeetingView() {
  const navigate = useNavigate();
  const { meetingId } = useParams<keyof MeetingViewPathParams>() as MeetingViewPathParams;
  const setVotings = useSetRecoilState<Voting[]>(votingsState);
  const [showVoteSuccessPopup, setShowVoteSuccessPopup] = useRecoilState(showVoteSuccessPopupState);
  const currentUser = useRecoilValue(currentUserStateOf(meetingId));

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
          <h1>{meeting.name}</h1>
          <Dropdown
            onClickConfirmButton={handleClickConfirmButton}
            onClickEditButton={() => {
              // TODO: 수정하기 api 연결
            }}
          />
        </HeaderContainer>
      </Header>
      <Contents>
        <UserList users={userList} onClick={handleClickUserList} />
        <VoteTable
          onClick={handleClickVoteTable}
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
              navigate(`/meetings/${meeting.id}/vote`);
            }}
          >
            {currentUser?.username ? '다시 투표하러 가기' : '투표하러 가기'}
          </Button>
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
