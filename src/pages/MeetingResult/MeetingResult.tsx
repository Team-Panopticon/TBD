import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { Voting } from '../../apis/votes';
import { Loading } from '../../components/Loading';
import { Page } from '../../components/pageLayout';
import { FlexVertical } from '../../components/styled';
import { useMeeting } from '../../hooks/useMeeting';
import { useVotings } from '../../hooks/useVotings';
import { votingsState } from '../../stores/voting';
import MeetingResultContents from '../../templates/MeetingResult/MeetingResultContents';
import MeetingResultFooter from '../../templates/MeetingResult/MeetingResultFooter';
import MeetingResultHeader from '../../templates/MeetingResult/MeetingResultHeader';

function MeetingResult() {
  const [, setVotings] = useRecoilState<Voting[]>(votingsState);
  const { isFetching: isMeetingFetching } = useMeeting();
  const { votings, isLoading, isFetching: isVotingsFetcing } = useVotings();
  const isFetching = isMeetingFetching && isVotingsFetcing;

  useEffect(() => {
    if (!isLoading && votings) {
      setVotings(votings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <Page>
      <FlexVertical flex={1} justifyContent={'flex-start'}>
        <MeetingResultHeader />
        <MeetingResultContents />
      </FlexVertical>
      <MeetingResultFooter />
    </Page>
  );
}

export default MeetingResult;
