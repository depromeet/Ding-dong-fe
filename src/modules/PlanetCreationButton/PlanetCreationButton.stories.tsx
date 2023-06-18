import type { Meta, StoryObj } from '@storybook/react';

import { PlanetCreationButton } from './index';

const meta: Meta<typeof PlanetCreationButton> = {
  title: 'modules/PlanetCreationButton',
  component: PlanetCreationButton,
  args: {},
};

export default meta;

type Story = StoryObj<typeof PlanetCreationButton>;

export const Primary: Story = {
  render: () => <PlanetCreationButton />,
};
