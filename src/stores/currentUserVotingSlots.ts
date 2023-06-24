import { atom } from 'recoil';

import { VotingSlot } from '../apis/votes';

export const currentUserVotingSlotsState = atom<VotingSlot[]>({
  key: 'currentUserVotingSlots',
  default: [],
});
