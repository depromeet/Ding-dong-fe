import Image from 'next/image';

import { Template } from '~/components/Template';

const info = {
  title: '새로운 행성으로 가기 전\n 몇 가지 질문들이 있어요!',
  description: '질문을 통해 나를 대표할 캐릭터를 만들거에요.',
  image: '/assets/images/onboarding-planet.png',
};

type CharacterBoardingStepProps = {
  onNext: () => void;
};

export const CharacterBoardingStep = ({ onNext }: CharacterBoardingStepProps) => {
  return (
    <div className="relative h-[calc(100vh-50px)]">
      <Image
        src={info.image}
        width={0}
        height={0}
        sizes="100vw"
        className="absolute left-0 top-0 z-below mt-none-t-nav max-h-[100vh] w-full object-cover"
        alt="onboarding planet image"
      />
      <Template className="flex h-full flex-col justify-between">
        <div>
          <Template.Title className="text-grey-900">
            <h1>{info.title}</h1>
          </Template.Title>
          <Template.Description className="mt-17pxr text-grey-500">
            <p>{info.description}</p>
          </Template.Description>
          <Template.Content />
        </div>
        <Template.Button className="" onClick={onNext}>
          시작하기
        </Template.Button>
      </Template>
    </div>
  );
};
