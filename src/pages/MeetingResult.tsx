import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { Voting } from '../apis/votes';
import { HifiveIcon } from '../components/IconComponent/HiFive';
import { Contents, Footer, Header, HeaderContainer, Page } from '../components/pageLayout';
import { FlexVertical, FullHeightButtonGroup } from '../components/styled';
import { UserList } from '../components/UserList/UserList';
import { useMeetingData } from '../hooks/useMeetingData';
import { useMeetingResult } from '../hooks/useMeetingResult';
import useShare from '../hooks/useShare';
import { votingsState } from '../stores/voting';
import { getMealLabel } from '../utils/getMealLabel';

export function MeetingResult() {
  const navigate = useNavigate();
  const [, setVotings] = useRecoilState<Voting[]>(votingsState);
  const { meetingId } = useParams();
  const { openShare, setTarget } = useShare();
  const {
    data: { meeting, votings },
  } = useMeetingData(meetingId || '');

  useEffect(() => {
    if (meeting && votings) {
      setVotings(votings);
      setTarget(meeting);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meeting, votings, meetingId, setVotings]);

  const { confirmedUserList, missedUserList } = useMeetingResult(meeting);

  const meetingDate = meeting?.confirmedDateType?.date;
  const meetingMeal = meeting?.confirmedDateType?.meal;

  return (
    <Page>
      <Contents>
        <FlexVertical gap={1}>
          <Header>
            <HeaderContainer>
              <FlexVertical flex={1} alignItems={'center'} gap={1}>
                <FlexVertical flex={1} gap={1}>
                  <Typography variant="h5" fontWeight={700} alignSelf={'center'}>
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
                    {meetingDate?.format('M/DD')} {getMealLabel(meetingMeal)}
                  </Typography>
                  <Typography variant="h5" color={'primary'} align="center">
                    {`[${meetingDate?.format('dddd') || ''}]`}
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
            공유
          </Button>
        </FullHeightButtonGroup>
      </Footer>
    </Page>
  );
}
