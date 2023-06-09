import { IdCardDetail } from '@/types/idCard';

export type CommunityIdCardSummaryType = Omit<IdCardDetail, 'profileImageUrl'>;

export type CommunitySummaryType = {
  communityId: number;
  thumbnailImageUrl: string;
  coverImageUrl: string;
  title: string;
};
