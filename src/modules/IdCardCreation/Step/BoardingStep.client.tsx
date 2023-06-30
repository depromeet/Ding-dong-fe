'use client';

import Image from 'next/image';

import BottomSheet, { useBottomSheet } from '~/components/BottomSheet';
import { Button, TextButton } from '~/components/Button';
import { QuestionCircleIcon } from '~/components/Icon';

type BoardingStepProps = {
  onNext: VoidFunction;
};

export const BoardingStep = ({ onNext }: BoardingStepProps) => {
  const bottomSheetHandlers = useBottomSheet();
  const onClickHelperText = () => {
    bottomSheetHandlers.onOpen();
  };

  return (
    <div className="px-layout-sm">
      <h1 className="text-h2 text-grey-900">주민증으로 나를 소개해요!</h1>
      <p className="mt-12pxr text-b1 text-grey-700">
        {`주민증에 담기는 내용을 언제든지\n수정할 수 있어요.`}
      </p>
      <div className="pb-32pxr">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/assets/images/id_card_creation.png"
            alt="explain id card"
            object-fit="contain"
            object-position="center"
            width={375}
            height={375}
          />
          <TextButton className="mt-36pxr flex gap-4pxr" onClick={() => onClickHelperText()}>
            <QuestionCircleIcon />
            <span className="text-b3 text-grey-600">어떻게 수정하나요?</span>
          </TextButton>
        </div>
      </div>
      <Button color="primary" size="large" onClick={onNext} className="mt-45pxr">
        주민증 만들기
      </Button>
      <BottomSheet {...bottomSheetHandlers}>
        <BottomSheet.Header>주민증 수정</BottomSheet.Header>
        <BottomSheet.Content>
          <div className="flex w-full flex-col items-center justify-center">
            <Image
              src="/assets/images/memo.png"
              alt="explain id card"
              object-fit="contain"
              object-position="center"
              width={160}
              height={160}
            />
            <span className="text-b1 text-grey-700">마이페이지에서 주민증을 수정할 수 있어요.</span>
          </div>
        </BottomSheet.Content>
        <BottomSheet.Footer>
          <BottomSheet.Footer.Button
            onClick={bottomSheetHandlers.onClose}
            size="large"
            color="primary"
            className="text-white"
          >
            확인했어요.
          </BottomSheet.Footer.Button>
        </BottomSheet.Footer>
      </BottomSheet>
    </div>
  );
};
