export type CharacterType = 'TRUE' | 'PIPI' | 'TOBBY' | 'BUDDY';

export type KeywordType = {
  keywordId: number;
  title: string;
  imageUrl: string;
  content: string;
};

export type IdCardType = {
  idCardId: string;
  nickname: string;
  profileImageUrl: string;
  aboutMe: string;
  keywords: KeywordType[];
  characterType: CharacterType;
};
