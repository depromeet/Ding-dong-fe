// TODO: Creation model 한정 지은 이유 물어보기
import { KeywordModel } from '~/types/idCard/model.type';

export type EditorSteps = 'PROFILE' | 'KEYWORD' | 'KEYWORD_CONTENT';

export type EditorKeywordModel = Omit<KeywordModel, 'keywordId'>;

export type IdCardEditorFormModel = {
  communityId: number;
  profileImageUrl: string;
  nickname: string;
  aboutMe: string;
  keywords: EditorKeywordModel[];
};
