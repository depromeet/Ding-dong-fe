import { KeywordModel } from '~/types/idCard/model.type';

export type Steps = 'BOARDING' | 'PROFILE' | 'KEYWORD' | 'KEYWORD_CONTENT' | 'COMPLETE';

export type CreateKeywordModel = Omit<KeywordModel, 'keywordId'>;

// id field 추가할 예정입니다
export type IdCardCreationFormModel = {
  profileImageUrl: string;
  communityId: number;
  nickname: string;
  aboutMe: string;
  keywords: CreateKeywordModel[];
};
