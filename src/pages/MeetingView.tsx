import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { getMeeting } from '../apis/meetings';
import { GetMeetingResponse } from '../apis/types';
import { getUsers, UserMap } from '../apis/users';
import { Contents, Footer, Header, HeaderContainer, Page } from '../components/pageLayout';
import { FullHeightButtonGroup } from '../components/styled';
import { UserList } from '../components/UserList/UserList';
import { VoteTable } from '../components/VoteTable/VoteTable';
import { useMeetingViewVoteMode } from '../hooks/useMeetingViewVoteMode';
import { currentUserState } from '../stores/currentUser';
import { userListState, userMapState } from '../stores/voting';
import { InputUsernameModal } from '../templates/MeetingView/InputUsernameModal';

export function MeetingView() {
  const currentUser = useRecoilValue(currentUserState);
  const [isViewMode, setIsViewMode] = useState<boolean>(!!currentUser);

  const MEETING_ID = '1';

  const [userMap, setUserMap] = useRecoilState<UserMap>(userMapState);
  const [meeting, setMeeting] = useState<GetMeetingResponse>();

  const userList = useRecoilValue(userListState);

  const { voteTableDataList, handleClickVoteTableSlot } = useMeetingViewVoteMode(meeting);

  const [showUsernameModal, setShowUsernameModal] = useState<boolean>(false);

  const handlePasswordConfirm = (username: string) => {
    /**
     * @TODO
     * 투표 반영 API
     */
  };

  useEffect(() => {
    (async () => {
      const data = await getUsers(1);
      setUserMap(data);

      const meetingData = await getMeeting(MEETING_ID);
      setMeeting(meetingData);
    })();
  }, [setUserMap, isViewMode]);

  if (!meeting || !voteTableDataList) {
    return null;
  }

  return (
    <Page>
      <Header>
        <HeaderContainer>
          <h1>모임 이름</h1>
        </HeaderContainer>
      </Header>
      <Contents>
        <div>toast message</div>
        <UserList users={userList} />
        {/* <VoteTable data={mockData} headers={['점심', '저녁']} /> */}
        <VoteTable
          onClick={handleClickVoteTableSlot}
          data={voteTableDataList}
          headers={['투표 현황']}
        />
      </Contents>
      <Footer>
        {isViewMode ? (
          <FullHeightButtonGroup
            fullWidth
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
          >
            <Button onClick={() => setIsViewMode(false)}>다시 투표하러 가기</Button>
          </FullHeightButtonGroup>
        ) : (
          <FullHeightButtonGroup
            fullWidth
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
          >
            <Button color="secondary" onClick={() => setIsViewMode(true)}>
              다음에하기
            </Button>
            <Button onClick={() => setShowUsernameModal(true)}>투표하기</Button>
          </FullHeightButtonGroup>
        )}
      </Footer>
      <InputUsernameModal
        show={showUsernameModal}
        usernameList={userList.map((user) => user.username)}
        onConfirm={handlePasswordConfirm}
        onCancel={() => setShowUsernameModal(false)}
      ></InputUsernameModal>
    </Page>
  );
}
