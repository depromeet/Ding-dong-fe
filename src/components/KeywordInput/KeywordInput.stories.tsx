import type { Meta, StoryObj } from '@storybook/react';
import { Controller, useForm } from 'react-hook-form';

import { KeywordInput } from './KeywordInput';
import { OptionType } from './keywordInput.type';

const meta: Meta<typeof KeywordInput> = {
  title: 'KeywordInput',
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

const KeywordInputWithRhf = () => {
  const { control, watch } = useForm({
    defaultValues: {
      keywords: [],
    },
  });
  console.log(watch(['keywords']));
  return (
    <Controller
      name="keywords"
      control={control}
      render={({ field: { onChange, value, name }, fieldState: { error } }) => (
        <KeywordInput
          id={name}
          placeholder="1개 이상의 키워드를 추가해주세요."
          keywordLabel="이런 키워드는 어때요?"
          activeKeywordList={value}
          keywordOptions={TEMP_RECOMMEND_KEYWORD_LIST}
          onChange={onChange} // rhf onchange handler
          maxActiveKeywordListLength={7}
          maxInputLength={8}
        />
      )}
    />
  );
};

export const Primary: Story = {
  render: () => <KeywordInputWithRhf />,
};
