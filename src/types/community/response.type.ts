import { SliceResponse } from '@/types/api';
import { CommunityIdCardsModel, CommunitySummaryModel } from '@/types/community';

export type CommunitiesResponse = CommunitySummaryModel[];

export type CommunityIdCardsResponse = {
  communityIdCardsDtos: SliceResponse<CommunityIdCardsModel>;
};
