export type Steps = 'BOARDING' | 'PROFILE' | 'KEYWORD' | 'KEYWORD_CONTENT' | 'COMPLETE';

// api 만들 때 type도 이동합니다
export type IdCardCreationForm = {
  nickname: string;
  aboutMe: string;
  keywords: { title: string; imageUrl: string; content: string }[];
};
