import { SliceResponse } from '@/types/api';
import { CommunitySummaryModel } from '@/types/community';
import { CommunityIdCardSummaryModel } from '@/types/community';

export type CommunitiesResponse = CommunitySummaryModel[];

export type CommunityIdCardsResponse = SliceResponse<CommunityIdCardSummaryModel>;
