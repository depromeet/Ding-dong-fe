import type { Meta, StoryObj } from '@storybook/react';

import Tag from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Tag',
  component: Tag,
};

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    type: 'true',
    label: '태그',
  },
};

export default meta;

export const Tobby: Story = {
  args: {
    type: 'tobby',
    label: '태그',
  },
};

export const Buddy: Story = {
  args: {
    type: 'buddy',
    label: '태그',
  },
};

export const Pipi: Story = {
  args: {
    type: 'pipi',
    label: '태그',
  },
};
