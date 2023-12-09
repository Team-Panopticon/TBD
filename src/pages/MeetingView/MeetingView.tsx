import { Loading } from '../../components/Loading';
import { Page } from '../../components/pageLayout';
import { useMeeting } from '../../hooks/useMeeting';
import { useVotings } from '../../hooks/useVotings';
import MeetingViewContents from '../../templates/MeetingView/MeetingViewContents';
import MeetingViewFooter from '../../templates/MeetingView/MeetingViewFooter';
import MeetingViewHeader from '../../templates/MeetingView/MeetingViewHeader';

function MeetingView() {
  const { isFetching: isMeetingFetching } = useMeeting();
  const { isFetching: isVotingsFetcing } = useVotings();
  const isFetching = isMeetingFetching && isVotingsFetcing;

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
