import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/Button/Button';

import BottomSheet from './BottomSheet';
import { useBottomSheet } from './useBottomSheet';

const meta: Meta<typeof BottomSheet> = {
  title: 'BottomSheet',
  component: BottomSheet,
};

type Story = StoryObj<typeof BottomSheet>;

const BottomSheetWithHooks = () => {
  const bottomSheetHandlers = useBottomSheet();
  return (
    <div>
      <Button size="medium" color="primary" onClick={bottomSheetHandlers.onOpen}>
        열기
      </Button>
      <BottomSheet {...bottomSheetHandlers}>
        <BottomSheet.Header>제목</BottomSheet.Header>
        <BottomSheet.Content>내용</BottomSheet.Content>
        <BottomSheet.Footer>
          <BottomSheet.Footer.Button
            onClick={bottomSheetHandlers.onClose}
            size="large"
            color="primary"
          >
            확인
          </BottomSheet.Footer.Button>
        </BottomSheet.Footer>
      </BottomSheet>
    </div>
  );
};
export const Default: Story = {
  render: () => <BottomSheetWithHooks />,
};

export default meta;
