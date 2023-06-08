export type KakaoProperties = {
  nickname: string;
  profile_image: string;
  thumbnail_image: string;
};

export type KakaoAccount = {
  email: string;
  age_range: string;
  birthday: string;
  gender: string;
};

export type KakaoUserInfoResponse = {
  id: string;
  properties: KakaoProperties;
  kakao_account: KakaoAccount;
};
