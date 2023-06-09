import { CreateKeywordType } from '@/types/idCard';

export type CreateIdCardRequestType = {
  communityId: number;
  nickname: string;
  aboutMe: string;
  keywords: CreateKeywordType[];
};
