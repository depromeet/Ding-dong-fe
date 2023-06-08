import type { StoryObj } from '@storybook/react';

import { LoadingStep } from '@/modules/IdCardCreation/Step';
import { BoardingStep } from '@/modules/IdCardCreation/Step';

import { ResidentCardSteps } from './IdCardSteps';

export default {
  title: 'ResidentCardSteps',
  component: ResidentCardSteps,
};

type Story = StoryObj<typeof ResidentCardSteps>;

export const Default: Story = {};

export const Loading = {
  render: () => <LoadingStep planetName="Ding dong" />,
};

export const Boarding = {
  render: () => (
    <BoardingStep
      planetName="Ding dong"
      onNext={() => {
        console.log('next');
      }}
    />
  ),
};
