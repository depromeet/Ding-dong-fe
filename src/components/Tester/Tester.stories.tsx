import type { Meta, StoryObj } from '@storybook/react';

import handlers from '@/mocks/handlers';

import Button from './index';

const meta: Meta<typeof Button> = {
  title: 'CATEGORY/Button',
  component: Button,
  parameters: {
    msw: {
      handlers,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: () => <Button />,
};
