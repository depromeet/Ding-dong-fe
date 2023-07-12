import type { Meta, StoryObj } from '@storybook/react';

import { CommunityAdmin } from './CommunityAdmin';
import { CommunityAdminCreate } from './CommunityAdminCreate.client';
import { CommunityAdminEdit } from './CommunityAdminEdit.client';

const meta: Meta<typeof CommunityAdmin> = {
  title: 'modules/CommunityAdmin',
  component: CommunityAdmin,
};

type Story = StoryObj<typeof CommunityAdmin>;

export const Default: Story = {
  render: () => <CommunityAdmin communityId={0} />,
};

export default meta;

export const Create: StoryObj<typeof CommunityAdminCreate> = {
  render: () => <CommunityAdminCreate />,
};

export const Edit: StoryObj<typeof CommunityAdminEdit> = {
  render: () => <CommunityAdminEdit communityId={0} />,
};
