import Image from 'next/image';
import { ReactNode, useState } from 'react';

import BottomSheet, { useBottomSheet } from '@/components/BottomSheet';
import Button from '@/components/Button/Button';
import TextButton from '@/components/Button/TextButton';
import { QuestionCircleIcon } from '@/components/Icon';
import { Swiper, SwiperSlide } from '@/components/Swiper';

type BoardingStepProps = {
  planetName: string;
  onNext: VoidFunction;
};

type SubStepType = 'explainIdCard' | 'explainHowToEditIdCard';

type SubStepDetailType = {
  id: SubStepType;
  label: string;
  image: string;
  helperText: string;
};

const subStepList: SubStepDetailType[] = [
  {
    id: 'explainIdCard',
    label: '행성에 거주하기 위해\n우선 주민증을 발급받아야 해!',
    image: 'explain-id-card',
    helperText: '주민증이 무엇인가요?',
  },
  {
    id: 'explainHowToEditIdCard',
    label: '주민증에 담기는 내용은\n언제든지 수정할 수 있으니 걱정마',
    image: 'explain-edit-id-card',
    helperText: '어떻게 수정하나요?',
  },
];

const subStepBottomSheet: Record<
  SubStepType,
  { header: ReactNode; content: ReactNode; footerButton: ReactNode }
> = {
  explainIdCard: {
    header: <h3>주민증이란?</h3>,
    content: <div className="h-[202px] w-full bg-grey-500"></div>,
    footerButton: '확인했어요',
  },
  explainHowToEditIdCard: {
    header: <h3>주민증 수정 안내</h3>,
    content: <div className="h-[202px] w-full bg-grey-500"></div>,
    footerButton: '확인했어요',
  },
};

export const BoardingStep = ({ planetName, onNext }: BoardingStepProps) => {
  const [currentIdx, setCurrentIdx] = useState<SubStepType>('explainIdCard');
  const bottomSheetHandlers = useBottomSheet();
  const onClickHelperText = (id: SubStepType) => {
    setCurrentIdx(id);
    bottomSheetHandlers.onOpen();
  };

  const bottomSheetContent = subStepBottomSheet[currentIdx];

  return (
    <div>
      <h1 className="mb-16pxr mt-[64px] text-h2 text-grey-900">{planetName}에 온걸 환영해!</h1>
      <Swiper slidesPerView="auto" pagination={{ clickable: true }} allowTouchMove>
        {subStepList.map(({ id, label, image, helperText }) => (
          <SwiperSlide key={id}>
            <div className="pb-32pxr">
              <p className="text-b1 text-grey-700">{label}</p>
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={`/assets/images/${image}.png`}
                  alt="explain id card"
                  object-fit="contain"
                  object-position="center"
                  width={259}
                  height={267}
                />
                <TextButton
                  className="mb-32pxr  flex gap-4pxr"
                  onClick={() => onClickHelperText(id)}
                >
                  <QuestionCircleIcon />
                  <span className="text-b3 text-grey-600">{helperText}</span>
                </TextButton>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Button color="primary" size="large" onClick={onNext} className="mt-52pxr">
        주민증 만들기
      </Button>
      <BottomSheet {...bottomSheetHandlers}>
        <BottomSheet.Header>{bottomSheetContent.header}</BottomSheet.Header>
        <BottomSheet.Content>{bottomSheetContent.content}</BottomSheet.Content>
        <BottomSheet.Footer>
          <BottomSheet.Footer.Button
            onClick={bottomSheetHandlers.onClose}
            size="large"
            color="primary"
          >
            {bottomSheetContent.footerButton}
          </BottomSheet.Footer.Button>
        </BottomSheet.Footer>
      </BottomSheet>
    </div>
  );
};
