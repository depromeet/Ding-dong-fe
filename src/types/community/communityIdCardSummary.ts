import { IdCardDetail } from '@/types/idCard';

export type CommunityIdCardSummary = Omit<IdCardDetail, 'profileImageUrl'>;
