import { CharacterNameModel } from '../idCard';

export type UserInfoModel = {
  userId: number;
  email: string;
  nickname: string;
  gender: string;
  ageRange: string;
  profileImageUrl: string;
  isCharacterCreated: boolean;
  planetIds: number[];
};

export type CharacterCreateModel = CharacterNameModel;
