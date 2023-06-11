import { BaseResponseType } from '@/lib/api/config/api.types';
import publicApi from '@/lib/api/config/publicApi';
import { REQUEST_API } from '@/lib/api/config/requestUrl';
import { IdCardDetailResponse } from '@/types/idCard';

const getIdCardDetail = (id: string) =>
  publicApi.get<BaseResponseType<IdCardDetailResponse>>(`${REQUEST_API.IDCARD.DETAIL}/${id}`);

const idCardApi = {
  getIdCardDetail,
};

export default idCardApi;
