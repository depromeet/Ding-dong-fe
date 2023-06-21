type ProgressBarProps = {
  currentStep: number;
  stepsLength: number;
};

export const ProgressBar = ({ currentStep, stepsLength }: ProgressBarProps) => {
  const percentage = (currentStep / stepsLength) * 100;

  return (
    <div className="relative h-[2px] bg-grey-300">
      <div
        style={{ width: `${percentage}%` }}
        className="absolute left-0 top-0 h-[2px] bg-primary-500 transition-width ease-in-out"
      />
    </div>
  );
};
