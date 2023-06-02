import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
};

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    size: 'medium',
    color: 'primary',
    disabled: false,
    width: 'w-80',
    children: '버튼',
  },
};

export default meta;
