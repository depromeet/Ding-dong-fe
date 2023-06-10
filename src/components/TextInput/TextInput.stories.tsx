import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { TextInput } from './index';

const meta: Meta<typeof TextInput> = {
  title: 'TextInput',
  component: TextInput,
  args: {},
};

export default meta;

type Story = StoryObj<typeof TextInput>;

const TextInputWithRhf = ({ ...rest }) => {
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
  render: () => <TextInputWithRhf />,
};

export const CustomLabel: Story = {
  render: () => <TextInputWithRhf labelClassName="text-h1 text-primary-700" />,
};

export const Required: Story = {
  render: () => <TextInputWithRhf required />,
};

export const Error: Story = {
  render: () => <TextInputWithRhf errorMessage="오류가 발생했습니다." />,
};

export const Disabled: Story = {
  render: () => <TextInputWithRhf disabled />,
};

export const Information: Story = {
  render: () => <TextInputWithRhf infoMessage="성공했습니다~" />,
};

export const MaxLength: Story = {
  render: () => <TextInputWithRhf maxLength={16} />,
};
