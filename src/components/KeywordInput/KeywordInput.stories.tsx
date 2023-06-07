import type { Meta, StoryObj } from '@storybook/react';

import { KeywordInput } from './KeywordInput';
import { OptionType } from './keywordInput.type';

const meta: Meta<typeof KeywordInput> = {
  title: 'CATEGORY/KeywordInput',
  component: KeywordInput,
  args: {},
};

export default meta;

type Story = StoryObj<typeof KeywordInput>;

/**
 * 캐리터 별로 추천키워드를 옵션값으로 받아야 합니다.
 */
const TEMP_RECOMMEND_KEYWORD_LIST: OptionType[] = [
  {
    text: '재치 발랄',
  },
  {
    text: '엽기 떡볶이',
  },
  {
    text: '맛집투어',
  },
  {
    text: 'FE 짱짱',
  },
  {
    text: '7팀 최고',
  },
  {
    text: '디프만 최고~',
  },
];

export const Primary: Story = {
  render: () => (
    <KeywordInput
      label={'이웃 주민에게 자신을 소개할' + '\n' + '키워드를 적어주세요!'}
      placeholder="1개 이상의 키워드를 추가해주세요."
      keywordLabel="이런 키워드는 어때요?"
      keywordOptions={TEMP_RECOMMEND_KEYWORD_LIST}
      onChange={event => console.log(event)} // rhf onchange handler
    />
  ),
};
