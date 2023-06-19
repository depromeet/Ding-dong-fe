import { privateApi } from '../config/privateApi.server';

export const getCommunityIdCard = async (id: number) => {
  return privateApi.get(`communities/${id}/idCards`);
};
