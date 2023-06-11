import type { Meta, StoryObj } from '@storybook/react';

import { PlanetEnterButtons } from './PlanetEnterButtons.client';

const meta: Meta<typeof PlanetEnterButtons> = {
  title: 'PlanetEnterButtons',
  component: PlanetEnterButtons,
};

type Story = StoryObj<typeof PlanetEnterButtons>;

export const Default: Story = {
  render: () => (
    <div className="mt-10">
      <PlanetEnterButtons />
    </div>
  ),
};

export default meta;
