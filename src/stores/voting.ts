import dayjs, { Dayjs } from 'dayjs';
import { atom, selector, selectorFamily } from 'recoil';

import { GetMeetingResponse } from '../apis/types';
import { Voting } from '../apis/votes';
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
  key: 'Voting',
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
        username: user.username,
        checked: false,
        focused: false,
      };
    });
  },
});

/**
 * @TODOS
 * 1. 이 파일에서 변경된 상태를 기준으로 컴포넌트에서 사용하는 코드 변경하기
 * 2. votings.ts에 mealtype인지 datetype인지 판별해서 보여주기 (mealType도 보여줄 수 있도록)
 */
