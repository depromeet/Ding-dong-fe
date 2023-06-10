export type AuthResponseModel = {
  accessToken: string;
  refreshToken: string;
  userId: number;
  accessTokenExpireDate: number;
};

export type KakaoPropertiesModel = {
  nickname: string;
  profile_image: string;
  thumbnail_image: string;
};

export type KakaoAccountModel = {
  email: string;
  age_range: string;
  birthday: string;
  gender: string;
};

export type KakaoUserInfoResponseModel = {
  id: string;
  properties: KakaoPropertiesModel;
  kakao_account: KakaoAccountModel;
};
