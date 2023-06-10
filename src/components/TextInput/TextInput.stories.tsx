import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { TextInput } from './index';

const meta: Meta<typeof TextInput> = {
  title: 'CATEGORY/TextInput',
  component: TextInput,
  args: {},
};

export default meta;

type Story = StoryObj<typeof TextInput>;

const KeywordInputWithRhf = ({ ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      inputSb: '',
    },
  });

  return (
    <TextInput
      {...register}
      placeholder="텍스트 영역"
      label="라벨"
      errorMessage={errors['inputSb']?.message}
      {...rest}
    />
  );
};

export const Primary: Story = {
  render: () => <KeywordInputWithRhf />,
};

export const CustomLabel: Story = {
  render: () => <KeywordInputWithRhf labelClassName="text-h1 text-primary-700" />,
};

export const Required: Story = {
  render: () => <KeywordInputWithRhf required />,
};

export const Error: Story = {
  render: () => <KeywordInputWithRhf errorMessage="오류가 발생했습니다." />,
};

export const Disabled: Story = {
  render: () => <KeywordInputWithRhf disabled />,
};

export const Information: Story = {
  render: () => <KeywordInputWithRhf infoMessage="성공했습니다~" />,
};

export const MaxLength: Story = {
  render: () => <KeywordInputWithRhf maxLength={16} />,
};
