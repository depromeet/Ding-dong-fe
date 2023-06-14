import type { Meta, StoryObj } from '@storybook/react';

import { createIdCard } from '~/mocks/idCard/idCard.mock';

import { IdCardEditor } from './index';

const meta: Meta<typeof IdCardEditor> = {
  title: 'IdCardEditor',
  component: IdCardEditor,
  args: {},
};

export default meta;

type Story = StoryObj<typeof IdCardEditor>;

// TODO: form관련으로 create mock data 수정하기
const MOCK_ID_CARD = createIdCard();
const { nickname, profileImageUrl, aboutMe, keywords } = MOCK_ID_CARD;

export const Primary: Story = {
  render: () => (
    <IdCardEditor
      communityId={123}
      nickname={nickname}
      profileImageUrl={profileImageUrl}
      aboutMe={aboutMe}
      keywords={keywords}
    />
  ),
};
