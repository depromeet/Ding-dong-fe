import { IdCardDetail } from '@/types/idCard';

export type CommunityIdCardSummary = Omit<IdCardDetail, 'profileImageUrl'>;

export type CommunitySummary = {
  communityId: number;
  thumbnailImageUrl: string;
  coverImageUrl: string;
  title: string;
};
