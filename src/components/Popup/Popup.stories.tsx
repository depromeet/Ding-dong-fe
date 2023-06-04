import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/Button/Button';

import Popup from './Popup';

const meta: Meta<typeof Popup> = {
  title: 'Popup',
  component: Popup,
};

type Story = StoryObj<typeof Popup>;

export const Default: Story = {
  args: {
    title: '타이틀',
    description: '세부 내용',
    buttons: (
      <>
        <Button size="medium" color="primary">
          {'버튼'}
        </Button>
        <Button size="medium" color="secondary">
          {'버튼'}
        </Button>
      </>
    ),
  },
};

export default meta;

export const Positive: Story = {
  args: {
    title: '타이틀',
    description: '세부 내용',
    buttons: (
      <>
        <Button size="medium" color="primary">
          {'버튼'}
        </Button>
      </>
    ),
  },
};
