import { privateApi } from '~/api/config/privateApi.server';
import { IdCardDetailResponse } from '~/types/idCard';

export const getIdCardDetailServer = (idCardId: number) =>
  privateApi.get<IdCardDetailResponse>(`/id-cards/${idCardId}`);
