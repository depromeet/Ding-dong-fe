import type { Meta, StoryObj } from '@storybook/react';

import { IdCardEditor } from './index';

const meta: Meta<typeof IdCardEditor> = {
  title: 'modules/IdCardEditor',
  component: IdCardEditor,
  args: {},
};

export default meta;

type Story = StoryObj<typeof IdCardEditor>;

export const Primary: Story = {
  render: () => <IdCardEditor communityId={123} />,
};
