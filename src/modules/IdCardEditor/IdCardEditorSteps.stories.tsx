import type { Meta, StoryObj } from '@storybook/react';

import { createIdCard } from '~/mocks/idCard/idCard.mock';

import { IdCardEditor } from './index';

const meta: Meta<typeof IdCardEditor> = {
  title: 'modules/IdCardEditor',
  component: IdCardEditor,
  args: {},
};

export default meta;

type Story = StoryObj<typeof IdCardEditor>;

const MOCK_ID_CARD = createIdCard();

export const Primary: Story = {
  render: () => <IdCardEditor {...MOCK_ID_CARD} />,
};
