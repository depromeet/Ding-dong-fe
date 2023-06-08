import type { StoryObj } from '@storybook/react';

import { IdCardCreationSteps } from './IdCardCreationSteps';

export default {
  title: 'IdCardSteps',
  component: IdCardCreationSteps,
};

type Story = StoryObj<typeof IdCardCreationSteps>;

export const Default: Story = {};
