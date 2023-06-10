import { IdCardDetailModel } from '@/types/idCard';

export type CommunityIdCardSummaryModel = Omit<IdCardDetailModel, 'profileImageUrl'>;

export type CommunitySummaryModel = {
  communityId: number;
  thumbnailImageUrl: string;
  coverImageUrl: string;
  title: string;
};
