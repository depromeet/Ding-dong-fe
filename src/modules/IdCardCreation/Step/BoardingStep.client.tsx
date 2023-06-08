import Image from 'next/image';

import Button from '@/components/Button/Button';
import TextButton from '@/components/Button/TextButton';
import { QuestionCircleIcon } from '@/components/Icon';
import { Swiper, SwiperSlide } from '@/components/Swiper';

type BoardingStepProps = {
  planetName: string;
  onNext: VoidFunction;
};

type SubStepType = {
  id: string;
  label: string;
  image: string;
  helperText: string;
};

const subStepList: SubStepType[] = [
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

export const BoardingStep = ({ planetName, onNext }: BoardingStepProps) => {
  const onClickHelperText = (id: SubStepType['id']) => {
    // id에 맞는 동작진행하기
  };
  return (
    <div>
      <h1 className="mb-16px text-h2 text-grey-900">{planetName}에 온걸 환영해!</h1>
      <Swiper slidesPerView="auto" pagination={{ clickable: true }} allowTouchMove>
        {subStepList.map(({ id, label, image, helperText }) => (
          <SwiperSlide key={id}>
            <div className="pb-32px">
              <p className="mb-[80px]">{label}</p>
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={`/assets/images/${image}.png`}
                  alt="explain id card"
                  object-fit="contain"
                  object-position="center"
                  width={259}
                  height={267}
                />
                <TextButton className="mb-32px  flex gap-4px" onClick={() => onClickHelperText(id)}>
                  <QuestionCircleIcon />
                  <span className="text-b3 text-grey-600">{helperText}</span>
                </TextButton>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Button color="primary" size="large" onClick={onNext} className="mt-52px">
        주민증 만들기
      </Button>
    </div>
  );
};
