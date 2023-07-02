import { SliceResponse } from '~/types/api';
import {
  CheckIdCardModel,
  CommunityDetailModel,
  CommunityIdCardsModel,
  CommunityListModel,
  CommunityUserInfoModel,
  InvitationCodeValidationModel,
} from '~/types/community';

export type CommunityIdCardsResponse = SliceResponse<CommunityIdCardsModel>;

export type CommunityDetailResponse = {
  communityDetailsDto: CommunityDetailModel;
};

export type CommunityListResponse = {
  communityListDtos: CommunityListModel[];
};

export type CommunityUpdateResponse = {
  id: number;
};

export type InvitationCodeValidationResponse = InvitationCodeValidationModel;
export type CommunityNameCheckResponse = {
  data: boolean;
};

export type CheckIdCardResponse = CheckIdCardModel;

export type CommunityUserInfoResponse = {
  myInfoInInCommunityDto: CommunityUserInfoModel;
};
