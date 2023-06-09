import { SliceResponse } from '@/types/api';
import { CommunitySummaryType } from '@/types/community';
import { CommunityIdCardSummaryType } from '@/types/community';

export type CommunitiesResponse = CommunitySummaryType[];

export type CommunityIdCardsResponse = SliceResponse<CommunityIdCardSummaryType>;
