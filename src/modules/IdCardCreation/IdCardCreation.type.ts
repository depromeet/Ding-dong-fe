export type Steps = 'BOARDING' | 'PROFILE' | 'KEYWORD' | 'KEYWORD_CONTENT' | 'COMPLETE';

export type KeywordField = { title: string; imageUrl: FileList; content: string };

// api 만들 때 type도 이동합니다
export type IdCardCreationForm = {
  nickname: string;
  aboutMe: string;
  keywords: KeywordField[];
};
