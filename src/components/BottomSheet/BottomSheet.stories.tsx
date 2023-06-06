import type { Meta, StoryObj } from '@storybook/react';

import BottomSheet from './BottomSheet';

const meta: Meta<typeof BottomSheet> = {
  title: 'BottomSheet',
  component: BottomSheet,
};

type Story = StoryObj<typeof BottomSheet>;

export const Default: Story = {
  args: {
    children: (
      <>
        <BottomSheet.Header>제목</BottomSheet.Header>
        <BottomSheet.Content>내용</BottomSheet.Content>
        <BottomSheet.Footer>
          <BottomSheet.Footer.Button size="large" color="primary">
            버튼
          </BottomSheet.Footer.Button>
        </BottomSheet.Footer>
      </>
    ),
  },
};

export default meta;
