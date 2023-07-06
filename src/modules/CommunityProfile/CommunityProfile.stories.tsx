import { Meta, StoryObj } from '@storybook/react';

import { CommunityBgImage } from './CommunityBgImage.client';
import { CommunityProfile } from './CommunityProfile';

const meta: Meta<typeof CommunityProfile> = {
  title: 'modules/CommunityProfile',
  component: CommunityProfile,
};

export default meta;

type Story = StoryObj<typeof CommunityProfile>;
export const CommunityProfileStory: Story = {
  render: () => (
    <CommunityProfile
      logoImageUrl="/assets/images/pipi.png"
      userCount={22}
      description="디프만은 디자이너와 개발자가기획부터 론칭까지 함께 경험하는 성장추구형 커뮤니티입니다"
    />
  ),
};

export const CommunityBgImageStory: StoryObj<typeof CommunityBgImage> = {
  render: () => (
    <CommunityBgImage
      community={{
        coverImageUrl: '/assets/images/planet-with-shadow.png',
        communityId: 1,
        title: 'planet',
        logoImageUrl: '/assets/images/pipi.png',
        userCount: 22,
        description:
          '디프만은 디자이너와 개발자가기획부터 론칭까지 함께 경험하는 성장추구형 커뮤니티입니다',
      }}
    />
  ),
};
