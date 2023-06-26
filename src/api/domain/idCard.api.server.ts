import { privateApi } from '~/api/config/privateApi.server';
import { CommunityMyIdCardDetailResponse, IdCardDetailResponse } from '~/types/idCard';

export const getIdCardDetailServer = (idCardId: number) =>
  privateApi.get<IdCardDetailResponse>(`/id-cards/${idCardId}`);

export const getCommunityMyIdCardDetailServer = (communityId: number) =>
  privateApi.get<CommunityMyIdCardDetailResponse>(`/communities/${communityId}/users/idCards`);
