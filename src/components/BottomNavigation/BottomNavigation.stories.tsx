import type { StoryObj } from '@storybook/react';

import { BottomNavigation } from './BottomNavigation';

export default {
  title: 'BottomNavigation',
  component: BottomNavigation,
};

type Story = StoryObj<typeof BottomNavigation>;

export const Default: Story = {
  render: () => <BottomNavigation />,
};
