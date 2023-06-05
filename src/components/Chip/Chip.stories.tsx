import type { Meta, StoryObj } from '@storybook/react';

import Chip from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Chip',
  component: Chip,
  args: {},
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Primary: Story = {
  render: () => <Chip text="텍스트" />,
};

export const Selected: Story = {
  render: () => <Chip text="텍스트" isSelected />,
};

export const WithCancelIcon: Story = {
  render: () => <Chip text="텍스트" themeType="close" />,
};
export const WithPlusIcon: Story = {
  render: () => <Chip text="텍스트" themeType="plus" />,
};
