import { MealType } from '../constants/meeting';

export const mockDateUserData = {
  user1: {
    name: '재빠른 표범',
    votings: {
      /**
       * date와 meal을 항상 가지고 있음
       * meeting type이 date일 경우에 meal은 launch로 기본 설정됨
       */
      date: [
        {
          date: '2022-11-26T01:44:39.114Z', // ISO date string
        },
        {
          date: '2022-11-26T01:44:39.114Z', // ISO date string
        },
      ],
      meal: [
        {
          date: '2022-11-26T01:44:39.114Z', // ISO date string
          meal: MealType.lunch,
        },
        {
          date: '2022-11-26T01:44:39.114Z', // ISO date string
          meal: MealType.lunch,
        },
      ],
    },
  },
  user2: {
    name: '사나운 하마',
    votings: {
      date: [
        {
          date: '2022-11-26T01:44:39.114Z', // ISO date string
        },
        {
          date: '2022-11-26T01:44:39.114Z', // ISO date string
        },
      ],
    },
  },
  user3: {
    name: '상냥한 기린',
    votings: {
      date: [
        {
          date: '2022-11-26T01:44:39.114Z', // ISO date string
        },
        {
          date: '2022-11-26T01:44:39.114Z', // ISO date string
        },
      ],
      meal: [
        {
          date: '2022-11-26T01:44:39.114Z', // ISO date string
          meal: MealType.lunch,
        },
        {
          date: '2022-11-26T01:44:39.114Z', // ISO date string
          meal: MealType.lunch,
        },
      ],
    },
  },
};

export const mockMealUserData = {
  user1: {
    name: '재빠른 표범',
    votings: {
      date: [
        {
          date: '2022-11-26T01:44:39.114Z', // ISO date string
        },
        {
          date: '2022-11-26T01:44:39.114Z', // ISO date string
        },
      ],
      meal: [
        {
          date: '2022-11-26T01:44:39.114Z', // ISO date string
          meal: 'lunch', // 'lunch' | 'dinner'
        },
        {
          date: '2022-11-26T01:44:39.114Z', // ISO date string
          meal: 'lunch', // 'lunch' | 'dinner'
        },
      ],
    },
  },
  user2: {
    name: '사나운 하마',
    votings: {
      date: [
        {
          date: '2022-11-26T01:44:39.114Z', // ISO date string
        },
        {
          date: '2022-11-26T01:44:39.114Z', // ISO date string
        },
      ],
      meal: [
        {
          date: '2022-11-26T01:44:39.114Z', // ISO date string
          meal: 'lunch', // 'lunch' | 'dinner'
        },
        {
          date: '2022-11-26T01:44:39.114Z', // ISO date string
          meal: 'lunch', // 'lunch' | 'dinner'
        },
      ],
    },
  },
  user3: {
    name: '상냥한 기린',
    votings: {
      date: [
        {
          date: '2022-11-26T01:44:39.114Z', // ISO date string
        },
        {
          date: '2022-11-26T01:44:39.114Z', // ISO date string
        },
      ],
      meal: [
        {
          date: '2022-11-26T01:44:39.114Z', // ISO date string
          meal: 'lunch', // 'lunch' | 'dinner'
        },
        {
          date: '2022-11-26T01:44:39.114Z', // ISO date string
          meal: 'lunch', // 'lunch' | 'dinner'
        },
      ],
    },
  },
};
