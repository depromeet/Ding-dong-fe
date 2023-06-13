import publicApi from '~/lib/api/config/publicApi';
import { CommunityIdCardsResponse } from '~/types/community';

const getCommunityIdCards = (id: string, pageParam: number) =>
  publicApi.get<CommunityIdCardsResponse>(`/communities/${id}/idCards?page=${pageParam}&size=10`);

const communityApi = {
  getCommunityIdCards,
};

export default communityApi;
