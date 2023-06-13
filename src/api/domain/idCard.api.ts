import publicApi from '~/api/config/publicApi';
import { REQUEST_API } from '~/api/config/requestUrl';
import { IdCardDetailResponse } from '~/types/idCard';

const getIdCardDetail = (id: string) =>
  publicApi.get<IdCardDetailResponse>(`${REQUEST_API.IDCARD.DETAIL}/${id}`);

const idCardApi = {
  getIdCardDetail,
};

export default idCardApi;
