import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { getMeeting } from '../apis/meetings';
import { Meeting } from '../apis/types';
import { getVotings, Voting } from '../apis/votes';
import { HifiveIcon } from '../components/IconComponent/HiFive';
import { Contents, Footer, Header, HeaderContainer, Page } from '../components/pageLayout';
import { FlexVertical, FullHeightButtonGroup } from '../components/styled';
import { UserList } from '../components/UserList/UserList';
import { useMeetingResult } from '../hooks/useMeetingResult';
import useShare from '../hooks/useShare';
import { votingsState } from '../stores/voting';

export function MeetingResult() {
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState<Meeting>();
  const { meetingId } = useParams();
  const [votings, setVotings] = useRecoilState<Voting[]>(votingsState);
  const { openShare } = useShare();
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

  const { confirmedUserList, missedUserList } = useMeetingResult();

  return (
    <Page>
      <Contents>
        <FlexVertical gap={1}>
          <Header>
            <HeaderContainer>
              <FlexVertical flex={1} alignItems={'center'} gap={1}>
                <FlexVertical flex={1} gap={1}>
                  <Typography variant="h5" fontWeight={700}>
                    축하합니다!
                  </Typography>
                  <FlexVertical alignItems={'center'}>
                    <HifiveIcon width={100} height={100}></HifiveIcon>
                  </FlexVertical>
                  <Typography variant="h5" fontWeight={300} align="center">
                    <Typography variant="body1" fontWeight={700} align="center">
                      {meeting?.name && `${meeting?.name}`}{' '}
                      <span style={{ fontWeight: 'normal' }}>의</span>
                    </Typography>
                    <Typography variant="body1" fontWeight={600} align="center">
                      날짜가 정해졌어요
                    </Typography>
                  </Typography>
                </FlexVertical>
                <FlexVertical>
                  <Typography variant="h2" color={'primary'} fontWeight={500} align="center">
                    {'11/4'}
                  </Typography>
                  <Typography variant="h5" color={'primary'} align="center">
                    {'[화요일]'}
                  </Typography>
                </FlexVertical>
              </FlexVertical>
            </HeaderContainer>
          </Header>

          <FlexVertical gap={1}>
            <UserList users={confirmedUserList}>
              <UserList.Title> 올 수 있는 사람들</UserList.Title>
              <UserList.Placeholder>{':('}</UserList.Placeholder>
            </UserList>

            <UserList users={missedUserList}>
              <UserList.Title color="secondary"> 아쉽지만 못오는 사람들</UserList.Title>
              <UserList.Placeholder>{':)'}</UserList.Placeholder>
            </UserList>
          </FlexVertical>
        </FlexVertical>
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
              meeting?.id && navigate(`/meetings/${meeting?.id}`);
            }}
          >
            상세보기
          </Button>
          <Button
            onClick={() => {
              openShare();
            }}
          >
            공유하기
          </Button>
        </FullHeightButtonGroup>
      </Footer>
    </Page>
  );
}
