import { CharacterNameModel } from '../idCard';

export type UserInfoModel = {
  userId: number;
  email: string;
  nickname: string;
  gender: string;
  ageRange: string;
  profileImageUrl: string;
};

export type CharacterCreateModel = CharacterNameModel;
