import type { Meta, StoryObj } from '@storybook/react';

import { LoginStep } from './index';

const meta: Meta<typeof LoginStep> = {
  title: 'modules/LoginStep',
  component: LoginStep,
  args: {},
};

export default meta;

type Story = StoryObj<typeof LoginStep>;

export const Primary: Story = {
  render: () => <LoginStep />,
};
