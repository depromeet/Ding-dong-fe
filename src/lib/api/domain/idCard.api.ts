import { BaseResponseType } from '@/lib/api/config/api.types';
import publicApi from '@/lib/api/config/publicApi';
import { REQUEST_API } from '@/lib/api/config/requestUrl';
import { IdCardDetailResponseType } from '@/types/idCard';

const getIdCardDetail = (id: string) =>
  publicApi.get<BaseResponseType<IdCardDetailResponseType>>(`${REQUEST_API.IDCARD.DETAIL}/${id}`);

const idCardApi = {
  getIdCardDetail,
};

export default idCardApi;
