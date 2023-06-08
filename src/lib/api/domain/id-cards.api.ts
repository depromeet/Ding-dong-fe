import { BaseResponseType, GetIdCardDetailType } from '@/lib/api/config/api.types';
import publicApi from '@/lib/api/config/publicApi';
import { REQUEST_API } from '@/lib/api/config/requestUrl';

const getIdCardDetail = (id: string) =>
  publicApi.get<BaseResponseType<GetIdCardDetailType>>(`${REQUEST_API.IDCARDS.DETAIL}/${id}`);

const idCardApi = {
  getIdCardDetail,
};

export default idCardApi;
