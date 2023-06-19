import { ProgressBar } from '../ProgressBar';

type TopNavigationProgressBarProps = {
  currentStep: number;
  stepsLength: number;
};

export const TopNavigationProgressBar = ({
  currentStep,
  stepsLength,
}: TopNavigationProgressBarProps) => {
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <ProgressBar currentStep={currentStep} stepsLength={stepsLength} />
    </div>
  );
};
