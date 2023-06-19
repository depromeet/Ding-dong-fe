import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'components/ProgressBar',
  component: ProgressBar,
};
export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Defulat: Story = {
  render: () => {
    const stepsLength = 5;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentStep, setCurrentStep] = useState(1);

    return (
      <div>
        <ProgressBar stepsLength={stepsLength} currentStep={currentStep} />
        <br />
        <div>{currentStep}</div>
        <button onClick={() => setCurrentStep(currentStep + 1)}>추가</button>
      </div>
    );
  },
};
