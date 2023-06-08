import { CreateKeyword } from '@/types/idCard';

export type CreateIdCardRequest = {
  communityId: number;
  nickname: string;
  aboutMe: string;
  keywords: CreateKeyword[];
};
