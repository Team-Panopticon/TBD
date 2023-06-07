import dayjs, { Dayjs } from 'dayjs';
import { atom, selector, selectorFamily } from 'recoil';

import { GetMeetingResponse } from '../apis/types';
import { Voting } from '../apis/votes';
import { UserListData } from '../components/UserList/UserList';
import { VoteTableRowData, VoteTableVoting } from '../components/VoteTable/VoteTable';
import { MealType, MeetingType } from '../constants/meeting';

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

export const getVotingCountByDay = (
  day: Dayjs,
  meetingType: MeetingType,
  votings: Voting[],
  mealType?: MealType,
) => {
  /** TODO: dateType인지 meatType인지 뽑아서 비교해야함 */
  return votings.reduce((acc, voting) => {
    if (meetingType === MeetingType.date) {
      const hasVotedForGivenDay = voting[meetingType]?.some((d) =>
        day.isSame(dayjs(d.date), 'day'),
      );
      if (hasVotedForGivenDay) {
        return acc + 1;
      }
    } else {
      const hasVotedForGivenDay = voting[meetingType]?.some(
        (d) => d.meal === mealType && day.isSame(dayjs(d.date), 'day'),
      );
      if (hasVotedForGivenDay) {
        return acc + 1;
      }
    }

    return acc;
  }, 0);
};

const getVotings = (votings: Voting[], meetingType: MeetingType, day: Dayjs) => {
  const total = votings.length;
  if (meetingType === MeetingType.meal) {
    const votingList: [VoteTableVoting, VoteTableVoting] = [
      {
        current: getVotingCountByDay(day, meetingType, votings, MealType.lunch),
        total,
        checked: false,
        focused: false,
      },
      {
        current: getVotingCountByDay(day, meetingType, votings, MealType.dinner),
        total,
        checked: false,
        focused: false,
      },
    ];
    return votingList;
  }
  if (meetingType === MeetingType.date) {
    const votingList: [VoteTableVoting] = [
      {
        current: getVotingCountByDay(day, meetingType, votings),
        total,
        checked: false,
        focused: false,
      },
    ];
    return votingList;
  }
  throw Error('invalid meetingType');
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
      if (!meeting || !meeting.type) {
        return;
      }

      const votings = get(votingsState);

      const tableDataList = meeting?.dates.map(dayjs).map<VoteTableRowData>((day) => ({
        date: day,
        votings: getVotings(votings, meeting.type, day),
      }));

      return tableDataList;
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
