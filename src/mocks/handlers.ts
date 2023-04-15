import { rest } from 'msw';

import { mockDateTypeMeeting, mockMealTypeMeeting } from './meetingData';
import { mockDateUserData, mockMealUserData } from './userData';

const baseURL = import.meta.env.VITE_API_BASE_URL as string;
export const handlers = [
  rest.get(`${baseURL}meetings/:meetingId/users`, (req, res, ctx) => {
    const meetingId = req.params.meetingId;
    if (meetingId === '1') {
      return res(ctx.status(200), ctx.json(mockDateUserData));
    }

    if (meetingId === '2') {
      return res(ctx.status(200), ctx.json(mockMealUserData));
    }

    return res(ctx.status(404));
  }),
  rest.get(`${baseURL}meetings/:meetingId`, (req, res, ctx) => {
    const meetingId = req.params.meetingId;
    if (meetingId === '1') {
      return res(ctx.status(200), ctx.json(mockDateTypeMeeting));
    }

    if (meetingId === '2') {
      return res(ctx.status(200), ctx.json(mockMealTypeMeeting));
    }

    return res(ctx.status(404));
  }),
];
