import { BaseResponseType } from '@/lib/api/config/api.types';
import publicApi from '@/lib/api/config/publicApi';
import { REQUEST_API } from '@/lib/api/config/requestUrl';
import { CommunitiesSummaryResponseType } from '@/types/community';

const getUserCommunityList = (id: string) =>
  publicApi.get<BaseResponseType<CommunitiesSummaryResponseType>>(
    `${REQUEST_API.COMMUNITINY.USERS}/${id}`,
  );

const communityApi = {
  getUserCommunityList,
};

export default communityApi;
