import type { Meta, StoryObj } from '@storybook/react';

import { NudgeItem } from './NudgeItem';

const meta: Meta<typeof NudgeItem> = {
  title: 'modules/NudgeItem',
  component: NudgeItem,
};

type Story = StoryObj<typeof NudgeItem>;

const opponentUser = {
  nickname: '최예원',
  profileImageUrl:
    'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1095.jpg',
  userId: 1,
};

export const Default: Story = {
  render: () => (
    <NudgeItem
      fromUserNudgeType="MEET"
      nudgeId={1}
      communityId={1}
      opponentUser={opponentUser}
      toUserNudgeType="FRIENDLY"
    />
  ),
};

export default meta;
