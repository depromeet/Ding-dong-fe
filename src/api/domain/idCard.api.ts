import privateApi from '~/api/config/privateApi';
import { CommunityMyIdCardDetailResponse, IdCardDetailResponse } from '~/types/idCard';

export const getIdCardDetail = (idCardId: string) =>
  privateApi.get<IdCardDetailResponse>(`/id-cards/${idCardId}`);

// 폴더 관련 고민
export const getCommunityMyIdCardDetail = (communityId: number) =>
  privateApi.get<CommunityMyIdCardDetailResponse>(`/communities/${communityId}/users/idCards`);
