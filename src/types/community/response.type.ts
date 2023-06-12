import { SliceResponse } from '@/types/api';
import { CommunityDetailModel, CommunityIdCardsModel } from '@/types/community';

export type CommunityIdCardsResponse = {
  communityIdCardsDtos: SliceResponse<CommunityIdCardsModel>;
};

export type CommunityDetailResponseType = {
  communityDetailsDto: CommunityDetailModel;
};
