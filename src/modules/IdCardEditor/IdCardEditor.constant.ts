import { OptionType } from '~/components/KeywordInput';

// TODO: 전체 form에서 사용되는 로직과 동일합니다! 추후 src/constant로 옮겨도 될 듯 해요~
export const MAX_KEYWORD_LIST_LENGTH = 7;
export const MAX_KEYWORD_INPUT_LENGTH = 8;
export const MAX_NICKNAME_LENGTH = 16;
export const MAX_ABOUT_ME_LENGTH = 50;

export const TEMP_RECOMMEND_KEYWORD_LIST: OptionType[] = [
  {
    title: '재치 발랄',
    imageUrl: '',
    content: '',
  },
  {
    title: '엽기 떡볶이',
    imageUrl: '',
    content: '',
  },
  {
    title: '맛집투어',
    imageUrl: '',
    content: '',
  },
  {
    title: 'FE 짱짱',
    imageUrl: '',
    content: '',
  },
  {
    title: '7팀 최고',
    imageUrl: '',
    content: '',
  },
  {
    title: '디프만 최고~',
    imageUrl: '',
    content: '',
  },
];
