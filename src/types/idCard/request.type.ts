import { KeywordType } from '@/types/idCard/dto.type';

export type CreateKeywordType = Pick<KeywordType, 'title' | 'content'> & { imageUrl: FileList };

export type CreateIdCardRequestType = {
  communityId: number;
  nickname: string;
  aboutMe: string;
  keywords: CreateKeywordType[];
};
