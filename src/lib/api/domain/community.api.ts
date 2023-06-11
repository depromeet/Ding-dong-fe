import { BaseResponseType } from '@/lib/api/config/api.types';
import publicApi from '@/lib/api/config/publicApi';
import { CommunityIdCardsResponse } from '@/types/community';

const getCommunityIdCards = (id: string, page: number, size: number) =>
  publicApi.get<BaseResponseType<CommunityIdCardsResponse>>(
    `/communities/${id}/idCards&page=${page}&size=${size}`,
  );

const communityApi = {
  getCommunityIdCards,
};

export default communityApi;
