import type { Meta, StoryObj } from '@storybook/react';

import { Menu } from './index';

const meta: Meta<typeof Menu> = {
  title: 'components/Menu',
  component: Menu,
  args: {},
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Primary: Story = {
  render: () => (
    <Menu>
      <Menu.Header>메뉴 헤더</Menu.Header>
      {[1, 2, 3, 4, 5].map(v => (
        <Menu.Element key={v}>{v}번 요소</Menu.Element>
      ))}
    </Menu>
  ),
};
