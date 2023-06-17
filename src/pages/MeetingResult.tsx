import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { getMeeting } from '../apis/meetings';
import { GetMeetingResponse } from '../apis/types';
import { getVotings, Voting } from '../apis/votes';
import { HifiveIcon } from '../components/IconComponent/HiFive';
import { Contents, Footer, Header, HeaderContainer, Page } from '../components/pageLayout';
import { FlexVertical, FullHeightButtonGroup } from '../components/styled';
import { UserList } from '../components/UserList/UserList';
import { useMeetingResult } from '../hooks/useMeetingResult';
import { votingsState } from '../stores/voting';

export function MeetingResult() {
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState<GetMeetingResponse>();
  const { meetingId } = useParams();
  const setVotings = useSetRecoilState<Voting[]>(votingsState);

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

  const { confirmedUserList, missedUserList } = useMeetingResult(meeting);

  return (
    <Page>
      <Contents>
        <FlexVertical gap={1}>
          <Header>
            <HeaderContainer>
              <Typography variant="h5" fontWeight={300} align="center">
                {'congratulations!'}
              </Typography>
              <FlexVertical alignItems={'center'}>
                <HifiveIcon width={100} height={100}></HifiveIcon>
              </FlexVertical>
              <Typography variant="h5" fontWeight={300} align="center">
                <Typography variant="body1" fontWeight={300} align="center">
                  {'부캠 연말 모임의'}
                </Typography>
                <Typography variant="body1" fontWeight={500} align="center">
                  날짜가 정해졌어요
                </Typography>
              </Typography>
            </HeaderContainer>
          </Header>
          <FlexVertical>
            <Typography variant="h2" color={'primary'} fontWeight={500} align="center">
              {'11/4'}
            </Typography>
            <Typography variant="h3" color={'primary'} align="center">
              {'화요일'}
            </Typography>
          </FlexVertical>

          <FlexVertical gap={1}>
            <FlexVertical>
              <Typography variant="caption" fontWeight={500} color={'primary'}>
                올 수 있는 사람들
              </Typography>
              <UserList users={confirmedUserList} />
            </FlexVertical>

            <FlexVertical>
              <Typography variant="caption" fontWeight={500}>
                아쉽지만 못오는 사람들
              </Typography>
              <UserList users={missedUserList} />
            </FlexVertical>
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
              navigate(`/meetings/1`);
            }}
          >
            다음에하기
          </Button>
          <Button
            onClick={() => {
              //
            }}
          >
            투표하기
          </Button>
        </FullHeightButtonGroup>
      </Footer>
    </Page>
  );
}
