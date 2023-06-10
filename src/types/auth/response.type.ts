import { KakaoAccountModel, KakaoPropertiesModel } from '@/types/auth/model.type';

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  userId: number;
  accessTokenExpireDate: number;
};

export type KakaoUserInfoResponse = {
  id: string;
  properties: KakaoPropertiesModel;
  kakao_account: KakaoAccountModel;
};
