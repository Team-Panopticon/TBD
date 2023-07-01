import dayjs, { Dayjs } from 'dayjs';
import { atom, selector, selectorFamily } from 'recoil';

import { GetMeetingResponse } from '../apis/types';
import { Voting, VotingSlot, VotingSlotResponse } from '../apis/votes';
import { UserListData } from '../components/UserList/UserList';
import { VoteTableRowData } from '../components/VoteTable/VoteTable';

// 원본 데이터 있고, 원본데이터를 정제
// 프론트쓸때 -> 정제해서 보내주고
// setUserList(VotingManager의 반환값), setVoteTable(VotingMananer의 반환값)
// 핸들러 -> VotingManager값 바꾸고, 프론트값으로해서 -> useState
// recoil 쓰는게 정답?
// [대안] selector로 매니저에서 할 함수들을 작성한다.

/**
 *  https://github.com/facebookexperimental/Recoil/issues/629
 *  https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
 */
type SelectorMapper<Type> = {
  [Property in keyof Type]: Type[Property] extends import('recoil').SerializableParam
    ? Type[Property]
    : Type[Property] extends Record<string, any> | undefined | null
    ? SelectorMapper<Type[Property]>
    : Type[Property];
};

export const getVotingCountByDay = (day: Dayjs, votings: Voting[]) => {
  /** TODO: dateType인지 meatType인지 뽑아서 비교해야함 */
  return votings.reduce((acc, voting) => {
    const hasVotedForGivenDay = voting.dateType?.some((d) => day.isSame(dayjs(d.date), 'day'));

    if (hasVotedForGivenDay) {
      return acc + 1;
    }

    return acc;
  }, 0);
};

export const votingsState = atom<Voting[]>({
  key: 'votings',
  default: [],
});

export const voteTableDataListState = selectorFamily<
  VoteTableRowData[] | undefined,
  SelectorMapper<GetMeetingResponse | undefined>
>({
  key: 'voteTableDataList',
  get:
    (meeting: GetMeetingResponse | undefined) =>
    ({ get }) => {
      const votings = get(votingsState);
      const total = votings.length;

      return meeting?.dates.map(dayjs).map<VoteTableRowData>((day) => ({
        date: day,
        votings: [
          {
            current: getVotingCountByDay(day, votings),
            total,
            checked: false,
            focused: false,
          },
        ],
      }));
    },
});

export const userListState = selector({
  key: 'userList',
  get: ({ get }) => {
    const votings = get(votingsState);

    return votings.map<UserListData>((user) => {
      return {
        id: user.id,
        username: user.username,
        checked: false,
        focused: false,
      };
    });
  },
});

// todo: meeting respose 에서 가져오기
const TempConfirmedVoting: VotingSlotResponse = {
  date: '2023-06-08T15:00:00.000Z',
};
export const missedUserListSelector = selector({
  key: 'missedUserListSelector',
  get: ({ get }) => {
    const votings = get(votingsState);

    return votings
      .filter((voting) => {
        const { mealType } = voting;
        return !mealType?.find((meal: VotingSlot) => {
          return meal.date.isSame(dayjs(TempConfirmedVoting.date), 'day');
        });
      })
      .map<UserListData>((voting) => {
        const { username, id } = voting;

        return {
          id,
          username,
          checked: false,
          focused: false,
        };
      });
  },
});

export const confiremdUserListSelector = selector({
  key: 'confiremdUserListSelector',
  get: ({ get }) => {
    const votings = get(votingsState);

    return votings
      .filter((voting) => {
        const { mealType } = voting;
        return !!mealType?.find((meal: VotingSlot) => {
          return meal.date.isSame(dayjs(TempConfirmedVoting.date), 'day');
        });
      })
      .map<UserListData>((voting) => {
        const { username, id } = voting;
        return {
          id,
          username,
          checked: true,
          focused: false,
        };
      });
  },
});
