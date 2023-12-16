import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { Voting } from '../../apis/votes';
import { Page } from '../../components/pageLayout';
import { FlexVertical } from '../../components/styled';
import { useVotings } from '../../hooks/useVotings';
import { votingsState } from '../../stores/voting';
import MeetingResultContents from '../../templates/MeetingResult/MeetingResultContents';
import MeetingResultFooter from '../../templates/MeetingResult/MeetingResultFooter';
import MeetingResultHeader from '../../templates/MeetingResult/MeetingResultHeader';

function MeetingResult() {
  const [, setVotings] = useRecoilState<Voting[]>(votingsState);
  const { votings, isLoading } = useVotings();

  useEffect(() => {
    if (!isLoading && votings) {
      setVotings(votings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

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
