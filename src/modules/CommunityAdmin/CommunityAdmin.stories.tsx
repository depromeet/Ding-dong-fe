import type { Meta, StoryObj } from '@storybook/react';

import { CommunityAdmin } from './CommunityAdmin';
import { CommunityAdminCreate } from './CommunityAdminCreate.client';
import { CommunityAdminEdit } from './CommunityAdminEdit.client';

const meta: Meta<typeof CommunityAdmin> = {
  title: 'modules/CommunityAdmin',
  component: CommunityAdmin,
};

type Story = StoryObj<typeof CommunityAdmin>;

export const Default: Story = {
  render: () => (
    <CommunityAdmin
      communityId={0}
      coverImageUrl="/assets/images/planet-with-shadow.png"
      logoImageUrl="/assets/images/pipi.png"
      title="Depromeet"
      userCount={22}
      description="디프만은 디자이너와 개발자가기획부터 론칭까지 함께 경험하는 성장추구형 커뮤니티입니다"
    />
  ),
};

export default meta;

export const Create: StoryObj<typeof CommunityAdminCreate> = {
  render: () => <CommunityAdminCreate />,
};

export const Edit: StoryObj<typeof CommunityAdminEdit> = {
  render: () => (
    <CommunityAdminEdit
      communityId={0}
      coverImageUrl="/assets/images/planet-with-shadow.png"
      logoImageUrl=""
      title="Depromeet"
      userCount={22}
      description="디프만은 디자이너와 개발자가기획부터 론칭까지 함께 경험하는 성장추구형 커뮤니티입니다"
    />
  ),
};
