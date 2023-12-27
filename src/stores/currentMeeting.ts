import { atom, selector } from 'recoil';

import { Meeting } from '../apis/types';

export const currentMeetingState = atom<Partial<Meeting>>({
  key: 'currentMeetingState',
  default: {
    name: '',
  },
});

export const currentMeetingStateSelector = selector({
  key: 'currentMeetingStateSelector',
  get: ({ get }) => {
    const votings = get(currentMeetingState);

    return votings;
  },
  set: ({ set }, newValue) => {
    set(currentMeetingState, newValue);
  },
});
