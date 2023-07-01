import { SliceResponse } from '~/types/api';
import {
  CommunityDetailModel,
  CommunityIdCardsModel,
  CommunityListModel,
  InvitationCodeValidationModel,
} from '~/types/community';

export type CommunityIdCardsResponse = {
  communityIdCardsDtos: SliceResponse<CommunityIdCardsModel>;
};

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
