import { SliceResponse } from '~/types/api';
import { CommunityDetailModel, CommunityIdCardsModel, CommunityListModel } from '~/types/community';

export type CommunityIdCardsResponse = {
  communityIdCardsDtos: SliceResponse<CommunityIdCardsModel>;
};

export type CommunityDetailResponse = {
  communityDetailsDto: CommunityDetailModel;
};

export type CommunityListResponse = {
  communityListDtos: CommunityListModel[];
};
