import type { Meta, StoryObj } from '@storybook/react';

import { CharacterCompleteStep } from './CharacterCompleteStep';

const meta: Meta<typeof CharacterCompleteStep> = {
  title: 'components/CharacterCompleteStep',
  component: CharacterCompleteStep,
  args: {},
};

export default meta;

type Story = StoryObj<typeof CharacterCompleteStep>;

export const Default: Story = {
  args: { characterName: 'BUDDY' },
};
