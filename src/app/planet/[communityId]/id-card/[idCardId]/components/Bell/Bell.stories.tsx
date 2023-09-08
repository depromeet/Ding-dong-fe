import type { Meta, StoryObj } from '@storybook/react';

import { Bell } from '~/app/planet/[communityId]/id-card/[idCardId]/components/Bell/Bell.client';

const meta: Meta<typeof Bell> = {
  title: 'components/Bell',
  component: Bell,
};

type Story = StoryObj<typeof Bell>;

export const Default: Story = {};

export default meta;
