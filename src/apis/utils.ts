import { api } from './instance';

export const warmUpInstance = () => api.get(`/warmer`);
