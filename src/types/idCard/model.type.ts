import { NudgeModel } from '~/types/nudge';

export type CharacterModel = {
  PIPI: { group: 'FIRST'; korean: '피피'; english: 'Pipi' };
  TRUE: { group: 'FIRST'; korean: '트루'; english: 'True' };
  TOBBY: { group: 'FIRST'; korean: '토비'; english: 'Tobby' };
  BUDDY: { group: 'FIRST'; korean: '버디'; english: 'Buddy' };
};

export type FormKeywordModel = Omit<KeywordModel, 'keywordId'>;

export type CharacterNameModel = keyof CharacterModel;

export type IdCardDetailModel = {
  idCardId: number;
  userId: number;
  nickname: string;
  aboutMe: string;
  profileImageUrl: string;
  keywords: KeywordModel[];
  characterType: keyof CharacterModel;
  commentCount: number;
  toNudgeType: NudgeModel;
};

export type KeywordModel = {
  keywordId: number;
  title: string;
  imageUrl: string;
  content: string;
};

// id field 추가할 예정입니다
export type IdCardCreationFormModel = {
  profileImageUrl: string;
  communityId: number;
  nickname: string;
  aboutMe: string;
  keywords: FormKeywordModel[];
};

export type IdCardEditorFormModel = {
  idCardId: number;
  profileImageUrl: string;
  nickname: string;
  aboutMe: string;
  keywords: FormKeywordModel[];
};
