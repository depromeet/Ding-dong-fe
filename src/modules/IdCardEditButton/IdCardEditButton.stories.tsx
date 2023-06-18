import type { Meta, StoryObj } from '@storybook/react';

import { IdCardEditButton } from './index';

const meta: Meta<typeof IdCardEditButton> = {
  title: 'modules/IdCardEditButton',
  component: IdCardEditButton,
  args: {},
};

export default meta;

type Story = StoryObj<typeof IdCardEditButton>;

export const Primary: Story = {
  render: () => <IdCardEditButton />,
};
