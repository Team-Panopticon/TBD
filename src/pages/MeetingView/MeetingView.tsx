import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { Voting } from '../../apis/votes';
import { Loading } from '../../components/Loading';
import { Page } from '../../components/pageLayout';
import { useMeeting } from '../../hooks/useMeeting';
import { useVotings } from '../../hooks/useVotings';
import { votingsState } from '../../stores/voting';
import MeetingViewContents from '../../templates/MeetingView/MeetingViewContents';
import MeetingViewFooter from '../../templates/MeetingView/MeetingViewFooter';
import MeetingViewHeader from '../../templates/MeetingView/MeetingViewHeader';

function MeetingView() {
  const { meeting, meetingId, isFetching: isMeetingFetching } = useMeeting();
  const { votings, isFetching: isVotingsFetcing } = useVotings();
  const isFetching = isMeetingFetching && isVotingsFetcing;

  const setVotings = useSetRecoilState<Voting[]>(votingsState);

  useEffect(() => {
    if (votings) {
      setVotings(votings);
    }
  }, [meeting, votings, setVotings, meetingId]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <Page>
      <MeetingViewHeader />
      <MeetingViewContents />
      <MeetingViewFooter />
    </Page>
  );
}

export default MeetingView;
