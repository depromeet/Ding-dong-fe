export type CharacterType = {
  PIPI: { group: 'FIRST'; korean: '피피'; english: 'Pipi' };
  TRUE: { group: 'FIRST'; korean: '트루'; english: 'True' };
  TOBBY: { group: 'FIRST'; korean: '토비'; english: 'Tobby' };
  BUDDY: { group: 'FIRST'; korean: '버디'; english: 'Buddy' };
};

export type IdCardDetailType = {
  idCardId: number;
  nickname: string;
  aboutMe: string;
  profileImageUrl: string;
  keywords: KeywordType[];
  characterType: keyof CharacterType;
};

export type KeywordType = {
  keywordId: number;
  title: string;
  imageUrl: string;
  content: string;
};
