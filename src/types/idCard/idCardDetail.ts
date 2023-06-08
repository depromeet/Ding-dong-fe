import { Keyword } from './keyword';

export type CharacterType = {
  PIPI: { group: 'FIRST'; korean: '피피'; english: 'Pipi' };
  LUNA: { group: 'FIRST'; korean: '루나'; english: 'Luna' };
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
