import { SliceResponse } from '@/types/api';
import { CommunitySummary } from '@/types/community';
import { CommunityIdCardSummary } from '@/types/community';

export type CommunitiesResponse = CommunitySummary[];

export type CommunityIdCardsResponse = SliceResponse<CommunityIdCardSummary>;
