import { AxiosResponse } from 'axios';

import { MealType } from '../constants/meeting';
import { api } from './instance';

export interface GetUsersResponse {
  [username: string]: {
    name: string;
    votings: {
      date: {
        date: string;
        meal?: MealType;
      }[];
      meal: {
        date: string;
        meal?: MealType;
      }[];
    };
  };
}

export const getUsers = async (meetingId: number) => {
  const response: AxiosResponse<GetUsersResponse> = await api.get(`/meetings/${meetingId}/users`);

  return response.data;
};
