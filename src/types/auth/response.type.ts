export type AuthResponseType = {
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

export type KakaoPropertiesType = {
  nickname: string;
  profile_image: string;
  thumbnail_image: string;
};

export type KakaoAccountType = {
  email: string;
  age_range: string;
  birthday: string;
  gender: string;
};

export type KakaoUserInfoResponseType = {
  id: string;
  properties: KakaoPropertiesType;
  kakao_account: KakaoAccountType;
};
