import {
  CheckIdCardResponse,
  CommunityDetailResponse,
  CommunityIdCardsRequest,
  CommunityIdCardsResponse,
  CommunityListResponse,
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

export const getCommunityListServer = (userId: number) =>
  privateApi.get<CommunityListResponse>(`/communities/users/${userId}`);

export const checkIdCardServer = (communityId: number) =>
  privateApi.get<CheckIdCardResponse>(`/communities/${communityId}/users`);
