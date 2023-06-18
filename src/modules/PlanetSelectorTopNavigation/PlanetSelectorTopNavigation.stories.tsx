import type { Meta, StoryObj } from '@storybook/react';

import { PlanetSelectorTopNavigation } from '~/modules/PlanetSelectorTopNavigation/PlanetSelectorTopNavigation';

const meta: Meta<typeof PlanetSelectorTopNavigation> = {
  title: 'modules/PlanetSelectorTopNavigation',
  component: PlanetSelectorTopNavigation,
};

type Story = StoryObj<typeof PlanetSelectorTopNavigation>;

export const Default: Story = {
  render: () => <PlanetSelectorTopNavigation />,
};

export default meta;
