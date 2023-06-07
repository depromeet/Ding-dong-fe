import type { Meta, StoryObj } from '@storybook/react';

import PlanetNavigationButtons from './PlanetEnterButtons';

const meta: Meta<typeof PlanetNavigationButtons> = {
  title: 'PlanetNavigationButtons',
  component: PlanetNavigationButtons,
};

type Story = StoryObj<typeof PlanetNavigationButtons>;

export const Default: Story = {
  render: () => (
    <div className="mt-10">
      <PlanetNavigationButtons />
    </div>
  ),
};

export default meta;
