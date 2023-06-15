import { IdCardDetailModel } from '~/types/idCard';

export type CommentCountResponse = {
  count: number;
};

export type IdCardDetailResponse = {
  idCardDetailsDto: IdCardDetailModel;
};

export type EditIdCardResponse = {
  id: number;
};
