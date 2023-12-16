import { UIEvent, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';

import { ScrollDownFloatingButton } from '../../components/buttons/ScrollDownFloatingButton';
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

  const pageElementRef = useRef<HTMLDivElement>(null);

  const [hasMoreBottomScroll, setHasMoreBottomScroll] = useState<boolean>(false);

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
      <MeetingViewHeader />
      <MeetingViewContents />
      <MeetingViewFooter />
      <ScrollDownFloatingButton onClick={handleScollDownButtonClick} show={hasMoreBottomScroll} />
    </Page>
  );
}

export default MeetingView;
