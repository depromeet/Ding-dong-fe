import type { Meta, StoryObj } from '@storybook/react';

import TopNavigation from './index';

const meta: Meta<typeof TopNavigation> = {
  title: 'TopNavigation',
  component: TopNavigation,
  args: {},
  parameters: {
    // storybook에서 useRouter를 쓰기 위한 설정
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;

type Story = StoryObj<typeof TopNavigation>;

export const Primary: Story = {
  render: () => <TopNavigation />,
};

export const CancelBackButton: Story = {
  render: () => <TopNavigation backButtonType="cancel" />,
};

export const TitleWithDBackButton: Story = {
  render: () => <TopNavigation title="Title" />,
};

export const TitleWithRightButton: Story = {
  render: () => <TopNavigation title="Title" />,
};

export const TitleWithCloseButton: Story = {
  render: () => (
    <TopNavigation
      title="Title"
      rightButtonElement={<button className="text-h5 text-primary-500">다음</button>}
    />
  ),
};
