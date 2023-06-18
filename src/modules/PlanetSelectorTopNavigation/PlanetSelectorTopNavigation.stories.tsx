import type { Meta, StoryObj } from '@storybook/react';

import handlers from '~/mocks/handlers';
import PlanetSelectorTopNavigation from '~/modules/PlanetSelectorTopNavigation/PlanetSelectorTopNavigation';

const meta: Meta<typeof PlanetSelectorTopNavigation> = {
  title: 'modules/PlanetSelectorTopNavigation',
  component: PlanetSelectorTopNavigation,
  parameters: {
    msw: {
      handlers: handlers,
    },
  },
};

type Story = StoryObj<typeof PlanetSelectorTopNavigation>;

export const Default: Story = {
  render: () => <PlanetSelectorTopNavigation />,
};

export default meta;
