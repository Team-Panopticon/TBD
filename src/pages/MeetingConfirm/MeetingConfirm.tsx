import { useState } from 'react';

import { VotingSlot } from '../../apis/votes';
import { Page } from '../../components/pageLayout';
import MeetingConfirmContents from '../../templates/MeetingConfirm/MeetingConfirmContents';
import MeetingConfirmFooter from '../../templates/MeetingConfirm/MeetingConfirmFooter';
import MeetingConfirmHeader from '../../templates/MeetingConfirm/MeetingConfirmHeader';

function MeetingConfirm() {
  const [selectedSlot, setSelectedSlot] = useState<VotingSlot>();

  return (
    <Page>
      <MeetingConfirmHeader />
      <MeetingConfirmContents selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
      <MeetingConfirmFooter selectedSlot={selectedSlot} />
    </Page>
  );
}

export default MeetingConfirm;
