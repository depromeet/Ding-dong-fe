import {
  CelebrationIcon,
  EyeIcon,
  HeartExchangeIcon,
  NudgeIcon,
  RiceIcon,
} from '~/components/Icon';
import { NudgeIconSelectorType } from '~/types/nudge';
import { ClassNameType } from '~/types/util';

type NudgeIconSelectorProps = {
  nudgeType: NudgeIconSelectorType;
  className?: ClassNameType;
};

type IconWithProps = {
  className: ClassNameType;
};

const bellIconMap: Record<NudgeIconSelectorType, React.FC<IconWithProps>> = {
  DEFAULT: ({ className, ...rest }) => <NudgeIcon className={className} {...rest} />,
  MEET: ({ className, ...rest }) => <CelebrationIcon className={className} {...rest} />,
  FRIENDLY: ({ className, ...rest }) => <EyeIcon className={className} {...rest} />,
  SIMILARITY: ({ className, ...rest }) => <HeartExchangeIcon className={className} {...rest} />,
  TALKING: ({ className, ...rest }) => <RiceIcon className={className} {...rest} />,
};

export const NudgeIconSelector = ({ nudgeType, className, ...rest }: NudgeIconSelectorProps) => {
  const IconComponent = bellIconMap[nudgeType];
  return <IconComponent className={className} {...rest} />;
};
