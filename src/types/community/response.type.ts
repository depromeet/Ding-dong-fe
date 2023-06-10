import { SliceResponseType } from '@/types/api';
import { CommunitySummaryType } from '@/types/community';
import { CommunityIdCardSummaryType } from '@/types/community';

export type CommunitiesSummaryResponseType = {
  communityListDtos: CommunitySummaryType[];
};

export type CommunityIdCardsResponseType = SliceResponseType<CommunityIdCardSummaryType>;
