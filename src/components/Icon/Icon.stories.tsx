import type { Meta } from '@storybook/react';

import { ArrowLeftIcon, CancelIcon, ChevronLeftIcon } from '@/components/Icon';
import { QuestionCircleIcon } from '@/components/Icon/QuestionCircleIcon';

const meta: Meta = {
  title: 'icon',
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
