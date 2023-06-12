import type { Meta, StoryObj } from '@storybook/react';

import { TopNavigation } from './index';

const meta: Meta<typeof TopNavigation> = {
  title: 'TopNavigation',
  component: TopNavigation,
  args: {},
};

export default meta;

type Story = StoryObj<typeof TopNavigation>;

export const Primary: Story = {
  render: () => {
    return (
      <TopNavigation>
        <TopNavigation.Left>
          <TopNavigation.BackButton />
        </TopNavigation.Left>
      </TopNavigation>
    );
  },
};

export const CancelBackButton: Story = {
  render: () => (
    <TopNavigation>
      <TopNavigation.Left>
        <TopNavigation.BackButton backButtonType="cancel" />
      </TopNavigation.Left>
    </TopNavigation>
  ),
};

export const BackButtonWithCustomLink: Story = {
  render: () => (
    <TopNavigation>
      <TopNavigation.Left>
        <TopNavigation.BackButton backLink="/custom-link" />
      </TopNavigation.Left>
    </TopNavigation>
  ),
};

export const TitleWithDBackButton: Story = {
  render: () => (
    <TopNavigation>
      <TopNavigation.Left>
        <TopNavigation.BackButton backLink="/custom-link" />
      </TopNavigation.Left>
      <TopNavigation.Title>Title</TopNavigation.Title>
    </TopNavigation>
  ),
};

export const TitleWithTwoLine: Story = {
  render: () => (
    <TopNavigation>
      <TopNavigation.Left>
        <TopNavigation.BackButton backLink="/custom-link" />
      </TopNavigation.Left>
      <TopNavigation.Title>
        <div className="flex flex-col items-center justify-center">
          <span className="text-b3 text-grey-500">김피피</span>
          <span className="text-grey-900">주민정보</span>
        </div>
      </TopNavigation.Title>
    </TopNavigation>
  ),
};

export const BottomBorder: Story = {
  render: () => (
    <TopNavigation bottomBorderColor="primary-500">
      <TopNavigation.Left>
        <TopNavigation.BackButton backLink="/custom-link" />
      </TopNavigation.Left>
      <TopNavigation.Title>Title</TopNavigation.Title>
    </TopNavigation>
  ),
};

export const TitleWithRightButton: Story = {
  render: () => (
    <TopNavigation bottomBorderColor="primary-500">
      <TopNavigation.Left>
        <TopNavigation.BackButton />
      </TopNavigation.Left>
      <TopNavigation.Title>Title</TopNavigation.Title>
      <TopNavigation.Right>
        <button className="text-h5 text-primary-500">다음</button>
      </TopNavigation.Right>
    </TopNavigation>
  ),
};
