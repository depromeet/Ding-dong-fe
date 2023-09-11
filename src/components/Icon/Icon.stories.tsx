import type { Meta } from '@storybook/react';

import {
  ArrowLeftIcon,
  ArrowVerticalIcon,
  CameraIcon,
  CancelBoldIcon,
  CancelCircleIcon,
  CancelIcon,
  CelebrationIcon,
  ChatBubbleIcon,
  CheckCircleFillIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DashIcon,
  EyeIcon,
  GearIcon,
  HeartExchangeIcon,
  HeartFillIcon,
  HeartIcon,
  HomeIcon,
  NotificationIcon,
  NudgeIcon,
  NudgeMessageIcon,
  PersonIcon,
  PlusIcon,
  QuestionCircleIcon,
  RiceIcon,
  SendIcon,
  ThreeDotsVerticalIcon,
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

export const CancelCircle = {
  render: () => <CancelCircleIcon />,
};

export const Cancel = {
  render: () => <CancelIcon />,
};

export const ChatBubble = {
  render: () => <ChatBubbleIcon />,
};

export const CheckCircleFill = {
  render: () => <CheckCircleFillIcon />,
};

export const CancelBold = {
  render: () => <CancelBoldIcon />,
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

export const Dash = {
  render: () => <DashIcon />,
};

export const Gear = {
  render: () => <GearIcon />,
};

export const HeartFill = {
  render: () => <HeartFillIcon />,
};

export const Heart = {
  render: () => <HeartIcon />,
};

export const Home = {
  render: () => <HomeIcon />,
};

export const Person = {
  render: () => <PersonIcon />,
};

export const Notification = {
  render: () => <NotificationIcon />,
};

export const Camera = {
  render: () => <CameraIcon />,
};

export const ArrowVertical = {
  render: () => <ArrowVerticalIcon />,
};

export const Send = {
  render: () => <SendIcon />,
};

export const ThreeDotsVertical = {
  render: () => <ThreeDotsVerticalIcon />,
};

export const Nudge = {
  render: () => <NudgeIcon />,
};

export const Celebration = {
  render: () => <CelebrationIcon />,
};

export const Eye = {
  render: () => <EyeIcon />,
};

export const HeartExchange = {
  render: () => <HeartExchangeIcon />,
};

export const Rice = {
  render: () => <RiceIcon />,
};

export const NudgeMessage = {
  render: () => <NudgeMessageIcon />,
};
