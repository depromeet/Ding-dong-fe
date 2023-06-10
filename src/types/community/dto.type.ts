import { IdCardDetailType } from '@/types/idCard';

export type CommunityIdCardSummaryType = Omit<IdCardDetailType, 'profileImageUrl'>;

export type CommunitySummaryType = {
  communityId: number;
  thumbnailImageUrl: string;
  coverImageUrl: string;
  title: string;
};
