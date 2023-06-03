import { VotingResponse } from '../apis/votes';
import { MealType } from '../constants/meeting';

export const mockDateVotingsData: VotingResponse[] = [
  {
    id: 'user1',
    username: '재빠른 표범',
    dateType: [
      {
        date: '2022-11-26T01:44:39.114Z',
      },
      {
        date: '2022-11-27T01:44:39.114Z',
      },
    ],
    mealType: [
      {
        date: '2022-11-26T01:44:39.114Z',
        meal: MealType.lunch,
      },
      {
        date: '2022-11-27T01:44:39.114Z',
        meal: MealType.lunch,
      },
    ],
  },
  {
    id: 'user2',
    username: '사나운 하마',
    dateType: [
      {
        date: '2022-11-26T01:44:39.114Z',
      },
      {
        date: '2022-11-29T01:44:39.114Z',
      },
    ],
    mealType: [
      {
        date: '2022-11-26T01:44:39.114Z',
        meal: MealType.lunch,
      },
      {
        date: '2022-11-29T01:44:39.114Z',
        meal: MealType.lunch,
      },
    ],
  },
  {
    id: 'user3',
    username: '상냥한 기린',
    dateType: [
      {
        date: '2022-11-30T01:44:39.114Z',
      },
      {
        date: '2022-11-25T01:44:39.114Z',
      },
    ],
    mealType: [
      {
        date: '2022-11-30T01:44:39.114Z',
        meal: MealType.lunch,
      },
      {
        date: '2022-11-25T01:44:39.114Z',
        meal: MealType.lunch,
      },
    ],
  },
];

export const mockMealVotingsData: VotingResponse[] = [
  {
    id: 'user1',
    username: '재빠른 표범',
    dateType: [
      {
        date: '2022-11-26T01:44:39.114Z',
      },
      {
        date: '2022-11-27T01:44:39.114Z',
      },
    ],
    mealType: [
      {
        date: '2022-11-26T01:44:39.114Z',
        meal: MealType.lunch,
      },
      {
        date: '2022-11-26T01:44:39.114Z',
        meal: MealType.dinner,
      },
      {
        date: '2022-11-27T01:44:39.114Z',
        meal: MealType.lunch,
      },
    ],
  },
  {
    id: 'user2',
    username: '사나운 하마',
    dateType: [
      {
        date: '2022-11-27T01:44:39.114Z',
      },
      {
        date: '2022-11-28T01:44:39.114Z',
      },
    ],
    mealType: [
      {
        date: '2022-11-27T01:44:39.114Z',
        meal: MealType.lunch,
      },
      {
        date: '2022-11-28T01:44:39.114Z',
        meal: MealType.lunch,
      },
    ],
  },
  {
    id: 'user3',
    username: '상냥한 기린',
    dateType: [
      {
        date: '2022-11-28T01:44:39.114Z',
      },
      {
        date: '2022-11-30T01:44:39.114Z',
      },
    ],
    mealType: [
      {
        date: '2022-11-28T01:44:39.114Z',
        meal: MealType.lunch,
      },
      {
        date: '2022-11-30T01:44:39.114Z',
        meal: MealType.dinner,
      },
    ],
  },
];
