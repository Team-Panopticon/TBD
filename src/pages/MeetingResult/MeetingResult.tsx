import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { Voting } from '../../apis/votes';
import { Loading } from '../../components/Loading';
import { Contents, Footer, Page } from '../../components/pageLayout';
import { FlexVertical, FullHeightButtonGroup } from '../../components/styled';
import { useMeeting } from '../../hooks/useMeeting';
import useShare from '../../hooks/useShare';
import { useVotings } from '../../hooks/useVotings';
import { votingsState } from '../../stores/voting';
import MeetingResultContents from '../../templates/MeetingResult/MeetingResultContents';
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

  if (isFetching) {
    return <Loading />;
  }

  return (
    <Page>
      <Contents>
        <FlexVertical gap={1}>
          <MeetingResultHeader />
          <MeetingResultContents />
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
