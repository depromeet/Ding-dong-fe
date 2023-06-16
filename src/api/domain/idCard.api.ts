import privateApi from '~/api/config/privateApi';
import { IdCardDetailResponse } from '~/types/idCard';

export const getIdCardDetail = (idCardId: string) =>
  privateApi.get<IdCardDetailResponse>(`/id-cards/${idCardId}`);
