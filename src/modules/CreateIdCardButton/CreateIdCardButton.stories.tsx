import type { Meta, StoryObj } from '@storybook/react';

import { CreateIdCardButton } from './index';

const meta: Meta<typeof CreateIdCardButton> = {
  title: 'modules/CreateIdCardButton',
  component: CreateIdCardButton,
  args: {},
};

export default meta;

type Story = StoryObj<typeof CreateIdCardButton>;

export const Primary: Story = {
  render: () => <CreateIdCardButton />,
};
