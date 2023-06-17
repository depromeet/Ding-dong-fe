import { KakaoAccountModel, KakaoPropertiesModel } from '~/types/auth/model.type';

export type AuthResponse = {
  data: unknown;
  accessToken: string;
  refreshToken: string;
  userId: number;
  accessTokenExpireDate: number;
};

export const AUTH_COOKIE_KEYS: Record<string, string> = {
  accessToken: 'dingdong_at',
  refreshToken: 'dingdong_rt',
  userId: 'dingdong_uid',
  accessTokenExpireDate: 'dingdong_at_expire_date',
} as const;

export type KakaoUserInfoResponse = {
  id: string;
  properties: KakaoPropertiesModel;
  kakao_account: KakaoAccountModel;
};
