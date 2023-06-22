import { tw } from '~/utils/tailwind.util';

type DividerProps = {
  className?: string;
};

export const Divider = ({ className = 'bg-grey-100' }: DividerProps) => {
  return <div className={`${tw(className, 'h-px')}`} />;
};
