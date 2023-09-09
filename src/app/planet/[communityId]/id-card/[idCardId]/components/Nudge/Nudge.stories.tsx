import type { Meta, StoryObj } from '@storybook/react';

import { Nudge } from '~/app/planet/[communityId]/id-card/[idCardId]/components/Nudge/Nudge.client';

const meta: Meta<typeof Nudge> = {
  title: 'components/Nudge',
  component: Nudge,
};

type Story = StoryObj<typeof Nudge>;

export const Default: Story = {};

export default meta;
