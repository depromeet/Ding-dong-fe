import type { Meta, StoryObj } from '@storybook/react';

import { PlanetMenu } from './index';

const meta: Meta<typeof PlanetMenu> = {
  title: 'modules/PlanetMenu',
  component: PlanetMenu,
  args: {},
};

export default meta;

type Story = StoryObj<typeof PlanetMenu>;

export const Primary: Story = {
  render: () => <PlanetMenu />,
};
