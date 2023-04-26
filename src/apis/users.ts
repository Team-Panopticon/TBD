import { AxiosResponse } from 'axios';

import { MealType } from '../constants/meeting';
import { api } from './instance';

export interface Votings {
  date: {
    date: string;
    meal?: MealType;
  }[];
  meal: {
    date: string;
    meal?: MealType;
  }[];
}

export interface GetUsersResponse {
  [username: string]: {
    name: string;
    votings: Votings;
  };
}

export const getUsers = async (meetingId: number) => {
  const response: AxiosResponse<GetUsersResponse> = await api.get(`/meetings/${meetingId}/users`);

  return response.data;
};
