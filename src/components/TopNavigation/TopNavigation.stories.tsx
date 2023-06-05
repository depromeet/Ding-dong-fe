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
  render: () => <TopNavigation titleElement="Title" />,
};

export const TitleWithTwoLine: Story = {
  render: () => (
    <TopNavigation
      titleElement={
        <div className="flex flex-col items-center justify-center">
          <span className="text-b3 text-grey-500">김피피</span>
          <span className="text-grey-900">주민정보</span>
        </div>
      }
    />
  ),
};

export const TitleWithRightButton: Story = {
  render: () => <TopNavigation titleElement="Title" />,
};

export const TitleWithCloseButton: Story = {
  render: () => (
    <TopNavigation
      titleElement="Title"
      rightButtonElement={<button className="text-h5 text-primary-500">다음</button>}
    />
  ),
};
