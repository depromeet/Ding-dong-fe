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
      errorMessage={errors['inputSb']?.message}
      {...rest}
    />
  );
};

export const Primary: Story = {
  render: () => <TextInputWithRhf />,
};

export const CustomLabel: Story = {
  render: () => <TextInputWithRhf label="라벨" labelClassName="text-h1 text-primary-700" />,
};

export const NoLabel: Story = {
  render: () => <TextInputWithRhf labelClassName="text-h1 text-primary-700" />,
};

export const Required: Story = {
  render: () => <TextInputWithRhf label="라벨" required />,
};

export const Error: Story = {
  render: () => <TextInputWithRhf label="라벨" errorMessage="오류가 발생했습니다." />,
};

export const Disabled: Story = {
  render: () => <TextInputWithRhf label="라벨" disabled />,
};

export const Information: Story = {
  render: () => <TextInputWithRhf label="라벨" infoMessage="성공했습니다~" />,
};

export const MaxLength: Story = {
  render: () => <TextInputWithRhf label="라벨" maxLength={16} />,
};

export const MaxLengthError: Story = {
  render: () => (
    <TextInputWithRhf label="라벨" errorMessage="오류가 발생했습니다." maxLength={16} />
  ),
};
