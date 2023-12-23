import { UIEvent, useEffect, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { ScrollDownFloatingButton } from '../../components/buttons/ScrollDownFloatingButton';
import { Page } from '../../components/pageLayout';
import { useMeeting } from '../../hooks/useMeeting';
import { currentUserStateFamily } from '../../stores/currentUser';
import MeetingVoteContents from '../../templates/MeetingVote/MeetingVoteContents';
import MeetingVoteFooter from '../../templates/MeetingVote/MeetingVoteFooter';
import MeetingVoteHeader from '../../templates/MeetingVote/MeetingVoteHeader';

function MeetingVote() {
  const [searchParams] = useSearchParams();
  const pageElementRef = useRef<HTMLDivElement>(null);
  const { meetingId } = useMeeting();

  const currentUser = useRecoilValue(currentUserStateFamily(meetingId));
  const isNewUser = !currentUser;

  const [hasMoreBottomScroll, setHasMoreBottomScroll] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isFromSharedURL = searchParams.get('ref') === 'share';
    if (isFromSharedURL && !isNewUser) {
      navigate(`/meetings/${meetingId}`);
    }
  }, [isNewUser, meetingId, navigate, searchParams]);

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
