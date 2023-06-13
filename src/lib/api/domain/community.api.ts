import publicApi from '~/lib/api/config/publicApi';
import { CommunityDetailResponse, CommunityIdCardsResponse } from '~/types/community';

const getCommunityIdCards = (id: string, pageParam: number) =>
  publicApi.get<CommunityIdCardsResponse>(`/communities/${id}/idCards?page=${pageParam}&size=10`);

const getCommunityDetail = (id: string) =>
  publicApi.get<CommunityDetailResponse>(`/communities/${id}`);

const communityApi = {
  getCommunityIdCards,
  getCommunityDetail,
};

export default communityApi;
