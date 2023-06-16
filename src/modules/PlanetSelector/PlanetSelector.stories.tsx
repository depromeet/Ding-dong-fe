import type { Meta, StoryObj } from '@storybook/react';

import { PlanetSelector } from '~/modules/PlanetSelector/PlanetSelector.client';

const meta: Meta<typeof PlanetSelector> = {
  title: 'modules/PlanetSelector',
  component: PlanetSelector,
};

type Story = StoryObj<typeof PlanetSelector>;

export const Default: Story = {
  render: () => <PlanetSelector />,
};

export default meta;
