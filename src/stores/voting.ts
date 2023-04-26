import dayjs, { Dayjs } from 'dayjs';
import { atom, selector, selectorFamily } from 'recoil';

import { GetMeetingResponse, ISODateTime } from '../apis/types';
import { UserMap } from '../apis/users';
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
  [Property in keyof Type]: Type[Property];
};

export interface DateVoting {
  date: Dayjs;
}

export interface MealVoting {
  date: ISODateTime;
  meal: Dayjs;
}

export interface UserVoting {
  date: DateVoting[];
  meals?: MealVoting[];
}

export const getVotingCountByDay = (day: Dayjs, userVotings: UserVoting[]) => {
  return userVotings.reduce((acc, votings) => {
    const hasVotedForGivenDay = votings.date.some((d) => day.isSame(dayjs(d.date), 'day'));

    if (hasVotedForGivenDay) {
      return acc + 1;
    }

    return acc;
  }, 0);
};

export const userMapState = atom<UserMap>({
  key: 'userMap',
  default: {},
});

export const voteTableDataListState = selectorFamily<
  VoteTableRowData[] | undefined,
  SelectorMapper<GetMeetingResponse | undefined>
>({
  key: 'voteTableDataList',
  get:
    (meeting: GetMeetingResponse | undefined) =>
    ({ get }) => {
      const userVotings = get(userVotingsState);
      const total = userVotings.length;

      return meeting?.dates.map(dayjs).map<VoteTableRowData>((day) => ({
        date: day,
        votings: [
          {
            current: getVotingCountByDay(day, userVotings),
            total,
            checked: false,
            focused: false,
          },
        ],
      }));
    },
});

export const userVotingsState = selector({
  key: 'userVotings',
  get: ({ get }) => {
    const userMap = get(userMapState);

    return Object.values(userMap).map((user) => user.votings);
  },
});

export const userListState = selector({
  key: 'userList',
  get: ({ get }) => {
    const userMap = get(userMapState);

    return Object.values(userMap).map<UserListData>((user) => {
      return {
        username: user.name,
        checked: false,
        focused: false,
      };
    });
  },
});
