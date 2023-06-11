/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

import { TextArea, useTextArea } from '@/components/TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'TextArea',
  component: TextArea,
  args: {},
};

export default meta;

const 재윤님최애 =
  'https://github.com/depromeet/Ding-dong-fe/assets/71386219/77c5b4ef-1c23-4727-afcd-c5ee8bb26f80';

type Story = StoryObj<typeof TextArea>;

const useStorybookWithRhf = () => {
  const { register } = useForm({
    defaultValues: {
      textareaSb: '',
    },
  });

  const { textCount, onChangeHandler } = useTextArea({ onChange: register('textareaSb').onChange });

  return {
    register,
    onChangeHandler,
    textCount,
  };
};

export const Primary: Story = {
  render: () => {
    const { register, onChangeHandler } = useStorybookWithRhf();
    return (
      <TextArea>
        <TextArea.Border>
          <TextArea.Content {...register('textareaSb')} onChange={onChangeHandler} />
        </TextArea.Border>
      </TextArea>
    );
  },
};

export const WithKeywordHeader: Story = {
  render: () => {
    const { register, onChangeHandler } = useStorybookWithRhf();
    return (
      <TextArea>
        <TextArea.Border>
          <TextArea.Header>키워드 제목</TextArea.Header>
          <TextArea.Content {...register('textareaSb')} onChange={onChangeHandler} />
        </TextArea.Border>
      </TextArea>
    );
  },
};

export const WithKeywordHeaderImage: Story = {
  render: () => {
    const { register, onChangeHandler } = useStorybookWithRhf();
    return (
      <TextArea>
        <TextArea.Border>
          <TextArea.Header>키워드 제목</TextArea.Header>
          <TextArea.Image src={재윤님최애} alt="text-area-image" />
          <TextArea.Content {...register('textareaSb')} onChange={onChangeHandler} />
        </TextArea.Border>
      </TextArea>
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const { register, onChangeHandler } = useStorybookWithRhf();
    return (
      <TextArea>
        <TextArea.Label label="라벨" />
        <TextArea.Border>
          <TextArea.Content {...register('textareaSb')} onChange={onChangeHandler} />
        </TextArea.Border>
      </TextArea>
    );
  },
};

export const CustomLabel: Story = {
  render: () => {
    const { register, onChangeHandler } = useStorybookWithRhf();
    return (
      <TextArea>
        <TextArea.Label label="라벨" labelClassName="text-h1 text-primary-700" />
        <TextArea.Border>
          <TextArea.Content {...register('textareaSb')} onChange={onChangeHandler} />
        </TextArea.Border>
      </TextArea>
    );
  },
};

export const Required: Story = {
  render: () => {
    const { register, onChangeHandler } = useStorybookWithRhf();
    return (
      <TextArea>
        <TextArea.Label label="라벨" required />
        <TextArea.Border>
          <TextArea.Content {...register('textareaSb')} onChange={onChangeHandler} />
        </TextArea.Border>
      </TextArea>
    );
  },
};

export const Error: Story = {
  render: () => {
    const { register, onChangeHandler } = useStorybookWithRhf();
    return (
      <TextArea>
        <TextArea.Label label="라벨" required />
        <TextArea.Border errorMessage="오류가 발생했습니다.">
          <TextArea.Content {...register('textareaSb')} onChange={onChangeHandler} />
        </TextArea.Border>
      </TextArea>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const { register, onChangeHandler } = useStorybookWithRhf();
    return (
      <TextArea>
        <TextArea.Label label="라벨" required />
        <TextArea.Border disabled>
          <TextArea.Content {...register('textareaSb')} disabled onChange={onChangeHandler} />
        </TextArea.Border>
      </TextArea>
    );
  },
};

export const Information: Story = {
  render: () => {
    const { register, onChangeHandler } = useStorybookWithRhf();
    return (
      <TextArea>
        <TextArea.Label label="라벨" required />
        <TextArea.Border infoMessage="성공했습니다~">
          <TextArea.Content {...register('textareaSb')} onChange={onChangeHandler} />
        </TextArea.Border>
      </TextArea>
    );
  },
};

export const MaxLength: Story = {
  render: () => {
    const { register, onChangeHandler, textCount } = useStorybookWithRhf();
    return (
      <TextArea>
        <TextArea.Label label="라벨" required />
        <TextArea.Border textCount={textCount} maxLength={50}>
          <TextArea.Content {...register('textareaSb')} onChange={onChangeHandler} />
        </TextArea.Border>
      </TextArea>
    );
  },
};

export const MaxLengthError: Story = {
  render: () => {
    const { register, onChangeHandler, textCount } = useStorybookWithRhf();
    return (
      <TextArea>
        <TextArea.Label label="라벨" required />
        <TextArea.Border errorMessage="오류가 발생했습니다." textCount={textCount} maxLength={50}>
          <TextArea.Content {...register('textareaSb')} onChange={onChangeHandler} />
        </TextArea.Border>
      </TextArea>
    );
  },
};
