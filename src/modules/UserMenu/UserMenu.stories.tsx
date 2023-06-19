import type { Meta, StoryObj } from '@storybook/react';

import { UserMenu } from './index';

const meta: Meta<typeof UserMenu> = {
  title: 'modules/UserMenu',
  component: UserMenu,
  args: {},
};

export default meta;

type Story = StoryObj<typeof UserMenu>;

export const Primary: Story = {
  render: () => <UserMenu />,
};
