import { BaseResponseType } from '@/lib/api/config/api.types';
import publicApi from '@/lib/api/config/publicApi';
import { CommunityIdCardsResponse } from '@/types/community';

const getCommunityIdCards = async (id: string, pageParam: number) => {
  const res = await publicApi
    .get<BaseResponseType<CommunityIdCardsResponse>>(
      `/communities/${id}/idCards?page=${pageParam}&size=10`,
    )
    .then(res => res.data)
    .catch(err => err.response.data);
  return res;
};

const communityApi = {
  getCommunityIdCards,
};

export default communityApi;
