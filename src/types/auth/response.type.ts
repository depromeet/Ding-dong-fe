export type AuthResponseType = {
  accessToken: string;
  refreshToken: string;
  userId: number;
  accessTokenExpireDate: number;
};

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
