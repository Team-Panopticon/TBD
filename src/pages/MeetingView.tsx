import { Button } from '@mui/material';
import dayjs from 'dayjs';
import { produce } from 'immer';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { getMeeting } from '../apis/meetings';
import { GetMeetingResponse } from '../apis/types';
import { getUsers, UserMap } from '../apis/users';
import { Contents, Footer, Header, HeaderContainer, Page } from '../components/pageLayout';
import { FullHeightButtonGroup } from '../components/styled';
import { UserList } from '../components/UserList/UserList';
import { SlotClickHandlerProps, VoteTable } from '../components/VoteTable/VoteTable';
import { MeetingType } from '../constants/meeting';
import { currentUserState } from '../stores/currentUser';
import { userListState, userMapState, voteTableDataListState } from '../stores/voting';

export function MeetingView() {
  const currentUser = useRecoilValue(currentUserState);
  const [isViewMode, setIsViewMode] = useState<boolean>(!!currentUser);

  const MEETING_ID = '1';

  const [userMap, setUserMap] = useRecoilState<UserMap>(userMapState);
  const [meeting, setMeeting] = useState<GetMeetingResponse>();

  const userList = useRecoilValue(userListState);
  const voteTableDataList = useRecoilValue(voteTableDataListState(meeting));

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

  // 필요한 정보: 유저 ID, 새로 투표하는 날짜, 점심/저녁 여부, 이미 투표되어있는지
  const onSlotClick = ({ date: clickedDate, mealType }: SlotClickHandlerProps) => {
    /**
     * 투표모드일 때 currentUser가
     * 1. 사용자를 선택했으면 존재한다.
     * 2. 사용자를 선택하지 않았으면 존재하지 않는다.(신규 유저)
     *
     * 신규 유저를 어떤 상태에다가 저장할꺼냐.....
     * 1. 사용자의 투표 현황을 따로 상태에 저장하고, 투표를 결정할 떄 userId 받고 userMap에 적용한다
     *    userMap에 데이터를 업데이트하기로 결정했다.....
     * 2. 신규 유저 id를 강제로 만들어서 map에다가 집어넣는다
     */
    const userId = currentUser?.id;
    if (!userId) {
      return;
    }
    const user = userMap[userId];
    const meetingType = meeting.type;

    const currentVotings = user.votings[meetingType];
    const isClickedDateAlreadyVoted = currentVotings.some((voting) =>
      voting.date.isSame(clickedDate, 'day'),
    );

    if (!isClickedDateAlreadyVoted) {
      const newUserMap = produce(userMap, (draft) => {
        draft[userId].votings[MeetingType.date].push({ date: clickedDate });
      });
      setUserMap(newUserMap);
    }
  };

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
          dates={meeting.dates.map(dayjs)}
          meetingType={meeting.type}
          userMap={userMap}
          currentUserId={currentUser?.id}
          onSlotClick={onSlotClick}
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
