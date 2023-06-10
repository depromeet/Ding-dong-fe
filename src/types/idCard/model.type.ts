export type CreateKeywordModel = Omit<KeywordModel, 'keywordId'>;

export type CharacterModel = {
  PIPI: { group: 'FIRST'; korean: '피피'; english: 'Pipi' };
  TRUE: { group: 'FIRST'; korean: '트루'; english: 'True' };
  TOBBY: { group: 'FIRST'; korean: '토비'; english: 'Tobby' };
  BUDDY: { group: 'FIRST'; korean: '버디'; english: 'Buddy' };
};

export type CharacterNameModel = keyof CharacterModel;

export type IdCardDetailModel = {
  idCardId: number;
  nickname: string;
  aboutMe: string;
  profileImageUrl: string;
  keywords: KeywordModel[];
  characterType: keyof CharacterModel;
};

export type KeywordModel = {
  keywordId: number;
  title: string;
  imageUrl: string;
  content: string;
};
