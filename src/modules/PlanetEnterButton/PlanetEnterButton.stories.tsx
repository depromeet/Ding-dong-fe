import type { Meta, StoryObj } from '@storybook/react';

import { PlanetEnterButton } from './PlanetEnterButton.client';

const meta: Meta<typeof PlanetEnterButton> = {
  title: 'modules/PlanetEnterButton',
  component: PlanetEnterButton,
};

type Story = StoryObj<typeof PlanetEnterButton>;

export const Default: Story = {
  render: () => (
    <div className="mt-10">
      <PlanetEnterButton />
    </div>
  ),
};

export default meta;
