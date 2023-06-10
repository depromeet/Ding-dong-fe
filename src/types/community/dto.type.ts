import { IdCardDetailType } from '@/types/idCard';

export type CommunityIdCardSummaryType = Omit<IdCardDetailType, 'profileImageUrl'>;

export type CommunitySummaryType = {
  communityId: number;
  logoImageUrl: string;
  coverImageUrl: string;
  title: string;
  idCardCount: number;
  description: string;
};
