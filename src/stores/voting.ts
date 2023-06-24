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

/**
 * 입력된 day 또는 day의 mealType에 대해 votings에서 투표 수를 찾아서 반환
 * meetingType이 date일 경우 날짜만 비교
 * meetingType이 meal일 경우 mealType을 함께 전달받아 mealType도 함께 비교
 */
const getVotingCountByDay = (
  meetingType: MeetingType,
  day: Dayjs,
  votings: Voting[],
  mealType?: MealType,
) => {
  return votings.reduce((acc, voting) => {
    const hasVotedForGivenDay = voting[meetingType]?.some((d) => {
      const isVotedDay = day.isSame(dayjs(d.date), 'day');
      // mealType이 있을 경우 mealType을 비교, 없으면 true
      const isSameMealType = mealType ? d.meal === mealType : true;

      return isVotedDay && isSameMealType;
    });
    if (hasVotedForGivenDay) {
      return acc + 1;
    }

    return acc;
  }, 0);
};

/** VoteTableRowData 타입의 votings를 생성 */
export const getVotings = (
  meetingType: MeetingType,
  day: Dayjs,
  votings: Voting[],
  currentVoting?: Voting,
) => {
  const total = currentVoting ? votings.length + 1 : votings.length;
  const focused = false; // focused는 false로 고정됨
  const votingsWithCurrentVoting = currentVoting ? [...votings, currentVoting] : votings;

  const getChecked = (mealType?: MealType) => {
    const checked =
      currentVoting?.[meetingType]?.some((votingSlot) => {
        const isVotedDay = day.isSame(dayjs(votingSlot.date), 'day');
        const isSameMealType = mealType ? votingSlot.meal === mealType : true;

        return isVotedDay && isSameMealType;
      }) ?? false;

    return checked;
  };

  if (meetingType === MeetingType.meal) {
    const votingList: [VoteTableVoting, VoteTableVoting] = [
      {
        total,
        focused,
        current: getVotingCountByDay(meetingType, day, votingsWithCurrentVoting, MealType.lunch),
        checked: getChecked(MealType.lunch),
        mealType: MealType.lunch,
      },
      {
        total,
        focused,
        current: getVotingCountByDay(meetingType, day, votingsWithCurrentVoting, MealType.dinner),
        checked: getChecked(MealType.dinner),
        mealType: MealType.dinner,
      },
    ];
    return votingList;
  } else {
    const votingList: [VoteTableVoting] = [
      {
        total,
        focused,
        current: getVotingCountByDay(meetingType, day, votingsWithCurrentVoting),
        checked: getChecked(),
      },
    ];
    return votingList;
  }
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
        votings: getVotings(meeting.type, day, votings),
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
