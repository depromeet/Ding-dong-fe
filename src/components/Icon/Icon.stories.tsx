import type { Meta } from '@storybook/react';

import {
  ArrowLeftIcon,
  BellIcon,
  CameraIcon,
  CancelIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  GearFillIcon,
  HomeIcon,
  PersonIcon,
  PlusIcon,
  QuestionCircleIcon,
} from '~/components/Icon';

const meta: Meta = {
  title: 'components/Icon',
};

// Icon 폴더의 파일명을 알파벳순서로 정렬해주세요~

export default meta;

export const ColorFillIcon = {
  render: () => <ArrowLeftIcon className="fill-green-600 stroke-2" />,
};

export const ResizeIcon = {
  render: () => <ArrowLeftIcon size={100} />,
};

export const HoverActiveIcon = {
  render: () => <ArrowLeftIcon size={100} className="hover:fill-cyan-700" />,
};

export const ArrowLeft = {
  render: () => <ArrowLeftIcon />,
};

export const Cancel = {
  render: () => <CancelIcon />,
};

export const ChevronLeft = {
  render: () => <ChevronLeftIcon />,
};

export const ChevronRight = {
  render: () => <ChevronRightIcon />,
};

export const Plus = {
  render: () => <PlusIcon />,
};

export const QuestionCircle = {
  render: () => <QuestionCircleIcon />,
};

export const GearFill = {
  render: () => <GearFillIcon />,
};

export const Home = {
  render: () => <HomeIcon />,
};

export const Person = {
  render: () => <PersonIcon />,
};

export const Bell = {
  render: () => <BellIcon />,
};

export const Camera = {
  render: () => <CameraIcon />,
};
