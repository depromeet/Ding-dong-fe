import { IdCardDetailModel } from '~/types/idCard';

export type CommentCountResponse = {
  count: number;
};

export type IdCardDetailResponse = {
  idCardDetailsDto: IdCardDetailModel;
};

export type CommunityMyIdCardDetailResponse = {
  idCardDetailsDto: IdCardDetailModel;
};

export type IdCardCreateResponse = { id: number };

export type IdCardEditResponse = {
  id: number;
};
