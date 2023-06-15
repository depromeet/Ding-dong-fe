import type { Meta, StoryObj } from '@storybook/react';

import Tag from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'components/Tag',
  component: Tag,
};

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    type: 'TRUE',
    label: '태그',
  },
};

export default meta;

export const Tobby: Story = {
  args: {
    type: 'TOBBY',
    label: '태그',
  },
};

export const Buddy: Story = {
  args: {
    type: 'BUDDY',
    label: '태그',
  },
};

export const Pipi: Story = {
  args: {
    type: 'PIPI',
    label: '태그',
  },
};
