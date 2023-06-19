import type { Meta, StoryObj } from '@storybook/react';

import { TopNavigation } from '~/components/TopNavigation';

import { PlanetSelector } from './index';

const meta: Meta<typeof PlanetSelector> = {
  title: 'modules/PlanetSelector',
  component: PlanetSelector,
  args: {},
};

export default meta;

type Story = StoryObj<typeof PlanetSelector>;

export const Primary: Story = {
  render: () => (
    <TopNavigation>
      <TopNavigation.Left>
        <PlanetSelector />
      </TopNavigation.Left>
    </TopNavigation>
  ),
};
