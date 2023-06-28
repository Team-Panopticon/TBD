import { rest } from 'msw';

import { mockDateTypeMeeting, mockMealTypeMeeting } from './meetingData';
import { mockDateVoting, mockDateVotingsData, mockMealVotingsData } from './votingsData';

const baseURL = import.meta.env.VITE_API_BASE_URL as string;
export const handlers = [
  rest.get(`${baseURL}meetings/:meetingId/votings`, (req, res, ctx) => {
    const meetingId = req.params.meetingId;
    if (meetingId === '1') {
      return res(ctx.status(200), ctx.json(mockDateVotingsData));
    }

    if (meetingId === '2') {
      return res(ctx.status(200), ctx.json(mockMealVotingsData));
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
  rest.post(`${baseURL}meetings/:meetingId/votings`, (req, res, ctx) => {
    return res(ctx.delay(500), ctx.json(mockDateVoting));
  }),
  rest.put(`${baseURL}meetings/:meetingId/votings/:votingId`, (req, res, ctx) => {
    return res(ctx.delay(500), ctx.json(mockDateVoting));
  }),
];
