/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { TextInput, useTextInput } from './index';

const meta: Meta<typeof TextInput> = {
  title: 'components/TextInput',
  component: TextInput,
  args: {},
};

export default meta;

type Story = StoryObj<typeof TextInput>;

const MAX_LENGTH = 16;

const useStorybookWithRhf = () => {
  const { register } = useForm({
    defaultValues: {
      textInputSb: '',
    },
  });

  const { value, onChangeHandler } = useTextInput({
    onChange: register('textInputSb').onChange,
    maxLength: MAX_LENGTH,
  });

  return {
    register,
    onChangeHandler,
    textCount: value.length,
  };
};

export const Primary: Story = {
  render: () => {
    const { register, onChangeHandler } = useStorybookWithRhf();
    return (
      <TextInput>
        <TextInput.Label name="textInputSb">라벨</TextInput.Label>
        <TextInput.Border>
          <TextInput.Content {...register('textInputSb')} onChange={onChangeHandler} />
        </TextInput.Border>
      </TextInput>
    );
  },
};

export const CustomLabel: Story = {
  render: () => {
    const { register, onChangeHandler } = useStorybookWithRhf();
    return (
      <TextInput>
        <TextInput.Label name="textInputSb" className="text-h1 text-primary-700">
          라벨
        </TextInput.Label>
        <TextInput.Border>
          <TextInput.Content {...register('textInputSb')} onChange={onChangeHandler} />
        </TextInput.Border>
      </TextInput>
    );
  },
};

export const Required: Story = {
  render: () => {
    const { register, onChangeHandler } = useStorybookWithRhf();
    return (
      <TextInput>
        <TextInput.Label name="textInputSb" required>
          라벨
        </TextInput.Label>
        <TextInput.Border>
          <TextInput.Content {...register('textInputSb')} onChange={onChangeHandler} />
        </TextInput.Border>
      </TextInput>
    );
  },
};

export const NoLabel: Story = {
  render: () => {
    const { register, onChangeHandler } = useStorybookWithRhf();
    return (
      <TextInput>
        <TextInput.Border>
          <TextInput.Content {...register('textInputSb')} onChange={onChangeHandler} />
        </TextInput.Border>
      </TextInput>
    );
  },
};

export const Error: Story = {
  render: () => {
    const { register, onChangeHandler } = useStorybookWithRhf();
    return (
      <TextInput>
        <TextInput.Label name="textInputSb">라벨</TextInput.Label>
        <TextInput.Border errorMessage="오류가 발생했습니다.">
          <TextInput.Content {...register('textInputSb')} onChange={onChangeHandler} />
        </TextInput.Border>
      </TextInput>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const { register, onChangeHandler } = useStorybookWithRhf();
    return (
      <TextInput>
        <TextInput.Label name="textInputSb">라벨</TextInput.Label>
        <TextInput.Border disabled>
          <TextInput.Content disabled {...register('textInputSb')} onChange={onChangeHandler} />
        </TextInput.Border>
      </TextInput>
    );
  },
};

export const Information: Story = {
  render: () => {
    const { register, onChangeHandler } = useStorybookWithRhf();
    return (
      <TextInput>
        <TextInput.Label name="textInputSb">라벨</TextInput.Label>
        <TextInput.Border infoMessage="성공했습니다~">
          <TextInput.Content {...register('textInputSb')} onChange={onChangeHandler} />
        </TextInput.Border>
      </TextInput>
    );
  },
};

export const MaxLength: Story = {
  render: () => {
    const { register, onChangeHandler, textCount } = useStorybookWithRhf();
    return (
      <TextInput>
        <TextInput.Label name="textInputSb">라벨</TextInput.Label>
        <TextInput.Border textCount={textCount} maxLength={MAX_LENGTH}>
          <TextInput.Content {...register('textInputSb')} onChange={onChangeHandler} />
        </TextInput.Border>
      </TextInput>
    );
  },
};

export const MaxLengthError: Story = {
  render: () => {
    const { register, onChangeHandler, textCount } = useStorybookWithRhf();
    return (
      <TextInput>
        <TextInput.Label name="textInputSb">라벨</TextInput.Label>
        <TextInput.Border
          errorMessage="오류가 발생했습니다."
          textCount={textCount}
          maxLength={MAX_LENGTH}
        >
          <TextInput.Content {...register('textInputSb')} onChange={onChangeHandler} />
        </TextInput.Border>
      </TextInput>
    );
  },
};
