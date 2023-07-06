import type { Meta, StoryObj } from '@storybook/react';

import { idCardDetailMock } from '~/mocks/idCard/idCard.mock';

import { IdCardEditor } from './index';

const meta: Meta<typeof IdCardEditor> = {
  title: 'modules/IdCardEditor',
  component: IdCardEditor,
  args: {},
};

export default meta;

type Story = StoryObj<typeof IdCardEditor>;

const MOCK_ID_CARD = idCardDetailMock();

const keywordsWithoutId = MOCK_ID_CARD.keywords.map(({ title, imageUrl, content }) => ({
  title,
  imageUrl,
  content,
}));

export const Primary: Story = {
  render: () => <IdCardEditor communityId={123} {...MOCK_ID_CARD} keywords={keywordsWithoutId} />,
};
