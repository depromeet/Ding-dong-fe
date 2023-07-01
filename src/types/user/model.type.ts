import { CharacterNameModel } from '../idCard';

export type UserInfoModel = {
  userId: number;
  email: string;
  nickname: string;
  gender: string;
  ageRange: string;
  profileImageUrl: string;
  characterType?: CharacterNameModel;
  communityIds: number[];
};

export type CharacterCreateModel = CharacterNameModel;
