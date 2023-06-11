import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { TextArea, TextAreaHeader, TextAreaImage } from './index';

const meta: Meta<typeof TextArea> = {
  title: 'TextArea',
  component: TextArea,
  args: {},
};

export default meta;

const 재윤님최애 =
  'https://github.com/depromeet/Ding-dong-fe/assets/71386219/77c5b4ef-1c23-4727-afcd-c5ee8bb26f80';

type Story = StoryObj<typeof TextArea>;

const TextAreaWithRhf = ({ ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      textareaSb: '',
    },
  });

  return (
    <TextArea
      {...register}
      placeholder="텍스트 영역"
      errorMessage={errors['textareaSb']?.message}
      {...rest}
    />
  );
};

export const Primary: Story = {
  render: () => <TextAreaWithRhf />,
};

export const WithKeywordHeader: Story = {
  render: () => (
    <TextAreaWithRhf>
      <TextAreaHeader>키워드 제목</TextAreaHeader>
    </TextAreaWithRhf>
  ),
};

export const WithKeywordHeaderImage: Story = {
  render: () => (
    <TextAreaWithRhf>
      <TextAreaHeader>키워드 제목</TextAreaHeader>
      <TextAreaImage src={재윤님최애} alt="text-area-image" />
    </TextAreaWithRhf>
  ),
};

export const WithLabel: Story = {
  render: () => <TextAreaWithRhf label="라벨" />,
};

export const CustomLabel: Story = {
  render: () => <TextAreaWithRhf label="라벨" labelClassName="text-h1 text-primary-700" />,
};

export const Required: Story = {
  render: () => <TextAreaWithRhf label="라벨" required />,
};

export const Error: Story = {
  render: () => <TextAreaWithRhf errorMessage="오류가 발생했습니다." />,
};

export const Disabled: Story = {
  render: () => <TextAreaWithRhf disabled />,
};

export const Information: Story = {
  render: () => <TextAreaWithRhf infoMessage="성공했습니다~" />,
};

export const MaxLength: Story = {
  render: () => <TextAreaWithRhf maxLength={50} />,
};

export const MaxLengthError: Story = {
  render: () => <TextAreaWithRhf errorMessage="오류가 발생했습니다." maxLength={50} />,
};
