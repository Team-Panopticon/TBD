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
import { useMeetingView } from '../hooks/useMeetingView';
import { currentUserState } from '../stores/currentUser';
import { showVoteSuccessPopupState } from '../stores/showVoteSuccessPopup';
import { votingsState } from '../stores/voting';
import { Dropdown } from '../templates/MeetingView/Dropdown/Dropdown';
import {
  ShareButtonWrapper,
  UserListLabel,
  UserListWrapper,
  VoteTableWrapper,
} from '../templates/MeetingView/styled';

export function MeetingView() {
  const setVotings = useSetRecoilState<Voting[]>(votingsState);
  const [showVoteSuccessPopup, setShowVoteSuccessPopup] = useRecoilState(showVoteSuccessPopupState);
  const currentUser = useRecoilValue(currentUserState);
  const [meeting, setMeeting] = useState<GetMeetingResponse>();
  const navigate = useNavigate();
  const { meetingId } = useParams();

  const { handleClickUserList, handleClickVoteTable, userList, voteTableDataList } =
    useMeetingView(meeting);

  useEffect(() => {
    (async () => {
      if (!meetingId) {
        return;
      }

      const data = await getVotings('2');
      setVotings(data);

      const meetingData = await getMeeting('2');
      setMeeting(meetingData);
    })();
  }, [setVotings, meetingId]);

  if (!meeting || !voteTableDataList) {
    return null;
  }

  return (
    <Page>
      <Header>
        <HeaderContainer>
          <h1>{meeting.name}</h1>
          <Dropdown
            onClickConfirmButton={() => {
              // TODO: 확정하기 api 연결
            }}
            onClickEditButton={() => {
              // TODO: 수정하기 api 연결
            }}
          />
        </HeaderContainer>
      </Header>
      <Contents>
        <UserListWrapper>
          <UserListLabel style={{ marginBottom: '8px' }}>참석자 목록</UserListLabel>
          <UserList className="user-list" users={userList} onClick={handleClickUserList} />
        </UserListWrapper>
        <VoteTableWrapper style={{ marginTop: '36px' }}>
          <VoteTable
            onClick={handleClickVoteTable}
            data={voteTableDataList}
            headers={['투표 현황']}
            className="vote-table"
          />
          <ShareButtonWrapper>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              style={{ borderRadius: 0 }}
            >
              공유하기
            </Button>
          </ShareButtonWrapper>
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
              navigate(`/meetings/${meeting.id}/vote`);
            }}
          >
            {currentUser?.username ? '다시 투표하러 가기' : '투표하러 가기'}
          </Button>
        </FullHeightButtonGroup>
      </Footer>
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
