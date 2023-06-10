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

interface CreateVoteRequestBody {
  username: string;
  dateType?: VotingSlot[];
  mealType?: VotingSlot[];
}

interface CreateVotingProps {
  meetingId: string;
  data: CreateVoteRequestBody;
}

export const createVoting = async ({ meetingId, data }: CreateVotingProps) => {
  /** @TODO */
  const response: AxiosResponse<any> = await api.post(`/meetings/${meetingId}/votings`, data);

  return response;
};

interface UpdateVotingProps extends CreateVotingProps {
  votingId: string;
}

export const updateVoting = async ({ meetingId, votingId, data }: UpdateVotingProps) => {
  const response: AxiosResponse<any> = await api.put(
    `/meetings/${meetingId}/votings/${votingId}`,
    data,
  );

  return response;
};
