import privateApi from '~/api/config/privateApi';
import { IdCardDetailResponse } from '~/types/idCard';

export const getIdCardDetail = (id: string) =>
  privateApi.get<IdCardDetailResponse>(`/id-cards/${id}`);
