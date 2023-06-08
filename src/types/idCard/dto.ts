export type CreateKeyword = Omit<Keyword, 'keywordId'>;

export type CharacterType = {
  PIPI: { group: 'FIRST'; korean: '피피'; english: 'Pipi' };
  TRUE: { group: 'FIRST'; korean: '트루'; english: 'True' };
  TOBBY: { group: 'FIRST'; korean: '토비'; english: 'Tobby' };
  BUDDY: { group: 'FIRST'; korean: '버디'; english: 'Buddy' };
};

export type IdCardDetail = {
  idCardId: number;
  nickname: string;
  aboutMe: string;
  profileImageUrl: string;
  keywords: Keyword[];
  characterType: keyof CharacterType;
};

export type Keyword = {
  keywordId: number;
  title: string;
  imageUrl: string;
  content: string;
};
