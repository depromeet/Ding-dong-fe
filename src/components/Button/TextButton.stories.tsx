import type { Meta, StoryObj } from '@storybook/react';

import TextButton from './TextButton';

const meta: Meta<typeof TextButton> = {
  title: 'components/TextButton',
  component: TextButton,
};

type Story = StoryObj<typeof TextButton>;

export const Default: Story = {
  render: () => (
    <TextButton className="-mt-10 w-full text-center text-b1 text-primary-500">
      딩동행성 둘러보기
    </TextButton>
  ),
};

export default meta;
