import Image from 'next/image';

import { Template } from '~/components/Template';

const info = {
  title: '새로운 행성으로 가기 전\n 몇 가지 질문들이 있어요!',
  description: '질문에 답하고 나를 대표할 캐릭터를 만들어보세요.',
  image: '/assets/images/onboarding-planet.png',
};

type CharacterBoardingStepProps = {
  onNext: () => void;
};

export const CharacterBoardingStep = ({ onNext }: CharacterBoardingStepProps) => {
  return (
    <Template>
      <Template.Title className="text-black">
        <h1>{info.title}</h1>
      </Template.Title>
      <Template.Description className="mt-17pxr text-grey-500">
        <p>{info.description}</p>
      </Template.Description>
      <Template.Content>
        <Image src={info.image} width={375} height={375} alt="onboarding planet image" />
      </Template.Content>
      <Template.Button onClick={onNext}>시작하기</Template.Button>
    </Template>
  );
};
