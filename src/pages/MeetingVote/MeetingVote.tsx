import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { Loading } from '../../components/Loading';
import { Page } from '../../components/pageLayout';
import { useMeeting } from '../../hooks/useMeeting';
import { useVotings } from '../../hooks/useVotings';
import { currentUserStateFamily } from '../../stores/currentUser';
import MeetingVoteContents from '../../templates/MeetingVote/MeetingVoteContents';
import MeetingVoteFooter from '../../templates/MeetingVote/MeetingVoteFooter';
import MeetingVoteHeader from '../../templates/MeetingVote/MeetingVoteHeader';

function MeetingVote() {
  const [searchParams] = useSearchParams();
  const { meetingId, isFetching: isMeetingFetching } = useMeeting();
  const { isFetching: isVotingsFetcing } = useVotings();
  const isFetching = isMeetingFetching && isVotingsFetcing;

  const currentUser = useRecoilValue(currentUserStateFamily(meetingId));
  const isNewUser = !currentUser;

  const navigate = useNavigate();

  useEffect(() => {
    const isFromSharedURL = searchParams.get('ref') === 'share';
    if (isFromSharedURL && !isNewUser) {
      navigate(`/meetings/${meetingId}`);
    }
  }, [isNewUser, meetingId, navigate, searchParams]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <Page>
      <MeetingVoteHeader />
      <MeetingVoteContents />
      <MeetingVoteFooter />
    </Page>
  );
}

export default MeetingVote;
