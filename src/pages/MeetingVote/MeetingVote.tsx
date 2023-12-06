import { UIEvent, useEffect, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { ScrollDownFloatingButton } from '../../components/buttons/ScrollDownFloatingButton';
import { Loading } from '../../components/Loading';
import { Page } from '../../components/pageLayout';
import { useMeeting } from '../../hooks/useMeeting';
import { useVotings } from '../../hooks/useVotings';
import { currentUserStateFamily } from '../../stores/currentUser';
import { currentUserVotingSlotsState } from '../../stores/currentUserVotingSlots';
import { votingsState as votingRecoilState } from '../../stores/voting';
import MeetingVoteContents from '../../templates/MeetingVote/MeetingVoteContents';
import MeetingVoteFooter from '../../templates/MeetingVote/MeetingVoteFooter';
import MeetingVoteHeader from '../../templates/MeetingVote/MeetingVoteHeader';

function MeetingVote() {
  const [searchParams] = useSearchParams();
  const pageElementRef = useRef<HTMLDivElement>(null);
  const { meeting, meetingId, isFetching: isMeetingFetching } = useMeeting();
  const { votings, isFetching: isVotingsFetcing } = useVotings();
  const isFetching = isMeetingFetching && isVotingsFetcing;

  const currentUser = useRecoilValue(currentUserStateFamily(meetingId));
  const setCurrentUserVotingSlots = useSetRecoilState(currentUserVotingSlotsState);
  const isNewUser = !currentUser;

  const [hasMoreBottomScroll, setHasMoreBottomScroll] = useState<boolean>(false);

  const setVotingsState = useSetRecoilState(votingRecoilState);
  const navigate = useNavigate();

  useEffect(() => {
    const isFromSharedURL = searchParams.get('ref') === 'share';
    if (isFromSharedURL && !isNewUser) {
      navigate(`/meetings/${meetingId}`);
    }
  }, [isNewUser, meetingId, navigate, searchParams]);

  useEffect(() => {
    if (meeting && votings) {
      setVotingsState(votings);
      const currentUserVoting = votings.find((voting) => voting.id === currentUser?.id);
      const currentUserVotingSlots = currentUserVoting?.[meeting.type];
      setCurrentUserVotingSlots(currentUserVotingSlots ?? []);
    }
  }, [meetingId, setVotingsState, setCurrentUserVotingSlots, currentUser, votings, meeting]);

  useResizeDetector({
    targetRef: pageElementRef,
    onResize: () => {
      if (pageElementRef.current === null) {
        return;
      }
      const { scrollTop, scrollHeight, clientHeight } = pageElementRef.current;
      setHasMoreBottomScroll(scrollTop + clientHeight < scrollHeight);
    },
  });

  const handlePageScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    setHasMoreBottomScroll(scrollTop + clientHeight < scrollHeight);
  };

  const handleScollDownButtonClick = () => {
    if (!pageElementRef.current) {
      return;
    }

    const viewportHeight = window.innerHeight;
    const scrollAmount = viewportHeight * 0.5;

    pageElementRef.current.scrollTo({
      top: pageElementRef.current.scrollTop + scrollAmount,
      behavior: 'smooth',
    });
  };

  if (isFetching) {
    return <Loading />;
  }

  if (!meeting) {
    return null;
  }

  return (
    <Page onScroll={handlePageScroll} ref={pageElementRef}>
      <MeetingVoteHeader />
      <MeetingVoteContents />
      <ScrollDownFloatingButton onClick={handleScollDownButtonClick} show={hasMoreBottomScroll} />
      <MeetingVoteFooter />
    </Page>
  );
}

export default MeetingVote;
