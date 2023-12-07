import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { Voting, VotingSlot } from '../../apis/votes';
import { Loading } from '../../components/Loading';
import { Page } from '../../components/pageLayout';
import { useMeeting } from '../../hooks/useMeeting';
import { useVotings } from '../../hooks/useVotings';
import { votingsState } from '../../stores/voting';
import MeetingConfirmContents from '../../templates/MeetingConfirm/MeetingConfirmContents';
import MeetingConfirmFooter from '../../templates/MeetingConfirm/MeetingConfirmFooter';
import MeetingConfirmHeader from '../../templates/MeetingConfirm/MeetingConfirmHeader';

function MeetingConfirm() {
  const { isFetching: isMeetingFetching } = useMeeting();
  const { votings, isFetching: isVotingsFetcing } = useVotings();
  const isFetching = isMeetingFetching && isVotingsFetcing;

  const setVotings = useSetRecoilState<Voting[]>(votingsState);
  const [selectedSlot, setSelectedSlot] = useState<VotingSlot>();

  useEffect(() => {
    if (votings) {
      setVotings(votings);
    }
  }, [setVotings, votings]);

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
