import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { Voting } from '../../apis/votes';
import { Loading } from '../../components/Loading';
import { Contents, Footer, Page } from '../../components/pageLayout';
import { FlexVertical, FullHeightButtonGroup } from '../../components/styled';
import { UserList } from '../../components/UserList/UserList';
import { useMeeting } from '../../hooks/useMeeting';
import { useMeetingResult } from '../../hooks/useMeetingResult';
import useShare from '../../hooks/useShare';
import { useVotings } from '../../hooks/useVotings';
import { votingsState } from '../../stores/voting';
import MeetingResultHeader from '../../templates/MeetingResult/MeetingResultHeader';

function MeetingResult() {
  const navigate = useNavigate();
  const [, setVotings] = useRecoilState<Voting[]>(votingsState);
  const { openShare, setTarget } = useShare();
  const { meeting, meetingId, isFetching: isMeetingFetching } = useMeeting();
  const { votings, isFetching: isVotingsFetcing } = useVotings();
  const isFetching = isMeetingFetching && isVotingsFetcing;

  useEffect(() => {
    if (meeting && votings) {
      setVotings(votings);
      setTarget(meeting);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meeting, votings, meetingId, setVotings]);

  const { confirmedUserList, missedUserList } = useMeetingResult(meeting);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <Page>
      <Contents>
        <FlexVertical gap={1}>
          <MeetingResultHeader />
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

export default MeetingResult;
