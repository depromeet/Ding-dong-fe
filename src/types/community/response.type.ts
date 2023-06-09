import { SliceResponseType } from '@/types/api';
import { CommunitySummaryType } from '@/types/community';
import { CommunityIdCardSummaryType } from '@/types/community';

export type CommunitiesResponseType = CommunitySummaryType[];

export type CommunityIdCardsResponseType = SliceResponseType<CommunityIdCardSummaryType>;