import type { Meta, StoryObj } from '@storybook/react';

import { CharacterCreationSteps } from './CharacterCreationSteps.client';

const meta: Meta<typeof CharacterCreationSteps> = {
  title: 'modules/CharacterCreationSteps',
  component: CharacterCreationSteps,
  args: {},
};

export default meta;

type Story = StoryObj<typeof CharacterCreationSteps>;

export const Default: Story = {};
