import type { Meta, StoryObj } from '@storybook/react';

import { GearIcon } from '~/components/Icon';
import { TopNavigation } from '~/components/TopNavigation';
import { PlanetSelector } from '~/modules/PlanetSelector';

import { TopNavigationProgressBar } from './TopNavigationProgressBar';

const meta: Meta<typeof TopNavigation> = {
  title: 'components/TopNavigation',
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

export const WithPlanetSelector: Story = {
  render: () => {
    return (
      <TopNavigation>
        <TopNavigation.Left>
          <PlanetSelector />
        </TopNavigation.Left>
      </TopNavigation>
    );
  },
};

export const PlanetTitleWithRightButton: Story = {
  render: () => {
    return (
      <TopNavigation>
        <TopNavigation.Left>
          <PlanetSelector />
        </TopNavigation.Left>
        <TopNavigation.Right>
          <GearIcon />
        </TopNavigation.Right>
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

export const BottomBorder: Story = {
  render: () => (
    <TopNavigation bottomBorderColor="primary-500">
      <TopNavigation.Left>
        <TopNavigation.BackButton />
      </TopNavigation.Left>
      <TopNavigation.Title>Title</TopNavigation.Title>
      <TopNavigation.Right>
        <GearIcon />
      </TopNavigation.Right>
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

export const TitleWithProgressBar: Story = {
  render: () => (
    <TopNavigation>
      <TopNavigation.Left>
        <TopNavigation.BackButton />
      </TopNavigation.Left>
      <TopNavigation.Title>Title</TopNavigation.Title>
      <TopNavigation.Right>
        <button className="text-h5 text-primary-500">다음</button>
      </TopNavigation.Right>
      <TopNavigationProgressBar currentStep={3} stepsLength={5} />
    </TopNavigation>
  ),
};
