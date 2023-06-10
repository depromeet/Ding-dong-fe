import type { Meta } from '@storybook/react';

import {
  ArrowLeftIcon,
  CancelIcon,
  ChevronLeftIcon,
  PlusIcon,
  QuestionCircleIcon,
} from '@/components/Icon';

const meta: Meta = {
  title: 'Icon',
};

export default meta;

export const ChevronLeft = {
  render: () => <ChevronLeftIcon />,
};

export const ArrowLeft = {
  render: () => <ArrowLeftIcon />,
};

export const Cancel = {
  render: () => <CancelIcon />,
};

export const QuestionCircle = {
  render: () => <QuestionCircleIcon />,
};
export const Plus = {
  render: () => <PlusIcon />,
};
