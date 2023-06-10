import { IdCardDetailType } from '@/types/idCard';

export type CommunityIdCardSummaryModel = Omit<IdCardDetailType, 'profileImageUrl'>;

export type CommunitySummaryModel = {
  communityId: number;
  thumbnailImageUrl: string;
  coverImageUrl: string;
  title: string;
};
