import { AxiosResponse } from 'axios';
import dayjs, { Dayjs } from 'dayjs';

import { MealType } from '../constants/meeting';
import { api } from './instance';
import { ISODateTime } from './types';

/** date가 string 타입인 서버 응답 타입 */
interface VotingSlotResponse {
  date: ISODateTime;
  meal?: MealType;
}

/** dateType / mealType의 date가 string 타입인 서버 응답 타입 */
export interface VotingResponse {
  id: string;
  username: string;
  dateType?: VotingSlotResponse[];
  mealType?: VotingSlotResponse[];
}

export interface Voting {
  id: string;
  username: string;
  dateType?: VotingSlot[];
  mealType?: VotingSlot[];
}

export interface VotingSlot {
  date: Dayjs;
  meal?: MealType;
}

const usersResponseToState = (response: VotingResponse[]): Voting[] => {
  return [...response].map((vote) => {
    return {
      ...vote,
      dateType: vote.dateType?.map((dateType) => ({
        meal: dateType.meal,
        date: dayjs(dateType.date),
      })),
      mealType: vote.mealType?.map((mealType) => ({
        meal: mealType.meal,
        date: dayjs(mealType.date),
      })),
    };
  });
};

export const getVotings = async (meetingId: string) => {
  const response: AxiosResponse<VotingResponse[]> = await api.get(`/meetings/${meetingId}/votings`);

  return usersResponseToState(response.data);
};

interface CreateVoteRequest {
  username: string;
  dateType?: VotingSlot[];
  mealType?: VotingSlot[];
}

export const createVoting = async (meetingId: string, data: CreateVoteRequest) => {
  /** @TODO */
  const response: AxiosResponse<any> = await api.post(`/meetings/${meetingId}/voting`, data);

  return response;
};
