import { CreateKeywordModel } from '@/types/idCard';

export type CreateIdCardRequest = {
  communityId: number;
  nickname: string;
  aboutMe: string;
  keywords: CreateKeywordModel[];
};
