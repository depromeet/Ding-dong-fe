import type { StoryObj } from '@storybook/react';

import { IdCardCreationSteps } from './IdCardCreationSteps';
import { BoardingStep, LoadingStep } from '@/modules/IdCardCreation/Step';

export default {
  title: 'IdCardSteps',
  component: IdCardCreationSteps,
};

type Story = StoryObj<typeof IdCardCreationSteps>;

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
