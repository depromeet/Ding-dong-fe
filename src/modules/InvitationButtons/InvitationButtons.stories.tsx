import type { Meta, StoryObj } from '@storybook/react';

import { InvitationButtons } from './index';

const meta: Meta<typeof InvitationButtons> = {
  title: 'modules/InvitationButtons',
  component: InvitationButtons,
  args: {},
};

export default meta;

type Story = StoryObj<typeof InvitationButtons>;

export const Primary: Story = {
  render: () => <InvitationButtons communityId={123} />,
};
