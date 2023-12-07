import { Dayjs } from 'dayjs';

import { VotingSlot } from '../../apis/votes';
import { VoteTableVoting } from '../../components/VoteTable/VoteTable';
import { useMeeting } from '../useMeeting';
import { useMeetingView } from '../useMeetingView';
import { isSameSlot } from '../useMeetingVote';

export const useMeetingConfirmContents = ({
  selectedSlot,
  setSelectedSlot,
}: {
  selectedSlot?: VotingSlot;
  setSelectedSlot: React.Dispatch<React.SetStateAction<VotingSlot | undefined>>;
}) => {
  const { meeting } = useMeeting();
  const {
    handleClickVoteTable: handleVoteTableClickHightlight,
    userList,
    voteTableDataList,
  } = useMeetingView(meeting);

  const handleClickVoteTable = (
    date: Dayjs,
    checked: boolean,
    target: VoteTableVoting,
    slot: VotingSlot,
  ) => {
    if (selectedSlot && isSameSlot(selectedSlot, slot)) {
      setSelectedSlot(undefined);
    } else {
      setSelectedSlot(slot);
    }
    handleVoteTableClickHightlight(date, checked, target, slot);
  };

  return {
    meeting,
    userList,
    voteTableDataList,
    handleClickVoteTable,
  };
};
