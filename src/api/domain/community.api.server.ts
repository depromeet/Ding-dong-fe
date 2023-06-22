import {
  CommunityDetailResponse,
  CommunityIdCardsRequest,
  CommunityIdCardsResponse,
} from '~/types/community';

import { privateApi } from '../config/privateApi.server';

export const getCommunityIdCardServer = async (id: number) => {
  return privateApi.get(`/communities/${id}/idCards`);
};

export const getCommunityDetailServer = (communityId: number) =>
  privateApi.get<CommunityDetailResponse>(`/communities/${communityId}`);

export const getCommunityIdCardsServer = ({
  communityId,
  pageParam = 0,
}: CommunityIdCardsRequest) =>
  privateApi.get<CommunityIdCardsResponse>(
    `/communities/${communityId}/idCards?page=${pageParam}&size=10`,
  );
