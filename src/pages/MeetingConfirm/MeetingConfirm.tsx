import { useState } from 'react';

import { VotingSlot } from '../../apis/votes';
import { Loading } from '../../components/Loading';
import { Page } from '../../components/pageLayout';
import { useMeeting } from '../../hooks/useMeeting';
import { useVotings } from '../../hooks/useVotings';
import MeetingConfirmContents from '../../templates/MeetingConfirm/MeetingConfirmContents';
import MeetingConfirmFooter from '../../templates/MeetingConfirm/MeetingConfirmFooter';
import MeetingConfirmHeader from '../../templates/MeetingConfirm/MeetingConfirmHeader';

function MeetingConfirm() {
  const { isFetching: isMeetingFetching } = useMeeting();
  const { isFetching: isVotingsFetcing } = useVotings();
  const isFetching = isMeetingFetching && isVotingsFetcing;

  const [selectedSlot, setSelectedSlot] = useState<VotingSlot>();

  if (isFetching) {
    return <Loading />;
  }

  return (
    <Page>
      <MeetingConfirmHeader />
      <MeetingConfirmContents selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <MeetingConfirmFooter selectedSlot={selectedSlot} />
    </Page>
  );
}

export default MeetingConfirm;
