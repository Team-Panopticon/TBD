import { AxiosResponse } from 'axios';
import dayjs, { Dayjs } from 'dayjs';

import { MealType } from '../constants/meeting';
import { api } from './instance';

interface GetUsersResponse {
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

export interface UserMap {
  [userId: string]: User;
}

export interface User {
  name: string;
  votings: UserVotings;
}

export interface UserVotings {
  date: VotingSlot[];
  meal: VotingSlot[];
}

export interface VotingSlot {
  date: Dayjs;
  meal?: MealType;
}

const usersResponseToState = (response: GetUsersResponse): UserMap => {
  const responseCopy = structuredClone(response) as unknown as UserMap;

  const users = Object.values(responseCopy);
  users.forEach((user) => {
    Object.values(user.votings.date).forEach((date) => (date.date = dayjs(date.date)));
  });

  return responseCopy;
};

export const getUsers = async (meetingId: number) => {
  const response: AxiosResponse<GetUsersResponse> = await api.get(`/meetings/${meetingId}/users`);

  const userMap = usersResponseToState(response.data);

  return userMap;
};
