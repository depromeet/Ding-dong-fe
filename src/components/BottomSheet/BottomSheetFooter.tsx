'use client';

import { PropsWithChildren } from 'react';

import { BottomSheetFooterButton } from '~/components/BottomSheet/BottomSheetFooterButton';

export const BottomSheetFooter = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

BottomSheetFooter.Button = BottomSheetFooterButton;
