import { BaseResponseType } from '~/lib/api/config/api.types';
import publicApi from '~/lib/api/config/publicApi';
import { CommunityDetailResponse, CommunityIdCardsResponse } from '~/types/community';

const getCommunityIdCards = async (id: string, pageParam: number) => {
  const res = await publicApi
    .get<BaseResponseType<CommunityIdCardsResponse>>(
      `/communities/${id}/idCards?page=${pageParam}&size=10`,
    )
    .then(res => res.data)
    .catch(err => err);
  return res;
};

const getCommunityDetail = async (id: string) => {
  const res = await publicApi
    .get<BaseResponseType<CommunityDetailResponse>>(`/communities/${id}`)
    .then(res => res.data)
    .catch(err => err);
  return res;
};

const communityApi = {
  getCommunityIdCards,
  getCommunityDetail,
};

export default communityApi;
