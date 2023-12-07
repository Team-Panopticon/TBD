import { Dayjs } from 'dayjs';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { Voting, VotingSlot } from '../../apis/votes';
import { VoteTableVoting } from '../../components/VoteTable/VoteTable';
import { votingsState } from '../../stores/voting';
import { useMeeting } from '../useMeeting';
import { useMeetingView } from '../useMeetingView';
import { isSameSlot } from '../useMeetingVote';
import { useVotings } from '../useVotings';

export const useMeetingConfirmContents = ({
  selectedSlot,
  setSelectedSlot,
}: {
  selectedSlot?: VotingSlot;
  setSelectedSlot: React.Dispatch<React.SetStateAction<VotingSlot | undefined>>;
}) => {
  const { meeting } = useMeeting();
  const { votings } = useVotings();
  const {
    handleClickVoteTable: handleVoteTableClickHightlight,
    userList,
    voteTableDataList,
  } = useMeetingView(meeting);
  const setVotings = useSetRecoilState<Voting[]>(votingsState);

  useEffect(() => {
    if (votings) {
      setVotings(votings);
    }
  }, [setVotings, votings]);

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
