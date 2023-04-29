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

export function MeetingView() {
  const currentUser = useRecoilValue(currentUserState);
  const [isViewMode, setIsViewMode] = useState<boolean>(!!currentUser);

  const MEETING_ID = '1';

  const [userMap, setUserMap] = useRecoilState<UserMap>(userMapState);
  const [meeting, setMeeting] = useState<GetMeetingResponse>();

  const userList = useRecoilValue(userListState);

  const { voteTableDataList, handleClickVoteTableSlot } = useMeetingViewVoteMode(meeting);

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
          <div>다시 투표하러 가기</div>
        ) : (
          <FullHeightButtonGroup
            fullWidth
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
          >
            <Button
              color="secondary"
              onClick={() => {
                /**
                 * @TODO viewmode로 변경
                 */
              }}
            >
              다음에하기
            </Button>
            <Button
              onClick={() => {
                /**
                 * @TODO 투표 api
                 */
              }}
            >
              투표하기
            </Button>
          </FullHeightButtonGroup>
        )}
      </Footer>
    </Page>
  );
}
