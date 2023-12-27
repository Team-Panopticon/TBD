import { UIEvent, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';

import { ScrollDownFloatingButton } from '../../components/buttons/ScrollDownFloatingButton';
import { Page } from '../../components/pageLayout';
import { SCROLL_DOWN_BUTTON_MARGIN } from '../../constants/meeting';
import MeetingViewContents from '../../templates/MeetingView/MeetingViewContents';
import MeetingViewFooter from '../../templates/MeetingView/MeetingViewFooter';
import MeetingViewHeader from '../../templates/MeetingView/MeetingViewHeader';

function MeetingView() {
  const pageElementRef = useRef<HTMLDivElement>(null);

  const [hasMoreBottomScroll, setHasMoreBottomScroll] = useState<boolean>(false);

  useResizeDetector({
    targetRef: pageElementRef,
    onResize: () => {
      if (pageElementRef.current === null) {
        return;
      }
      const { scrollTop, scrollHeight, clientHeight } = pageElementRef.current;
      const remainingScroll = scrollHeight - scrollTop - clientHeight;
      setHasMoreBottomScroll(remainingScroll > SCROLL_DOWN_BUTTON_MARGIN);
    },
  });

  const handlePageScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const remainingScroll = scrollHeight - scrollTop - clientHeight;
    setHasMoreBottomScroll(remainingScroll > SCROLL_DOWN_BUTTON_MARGIN);
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
