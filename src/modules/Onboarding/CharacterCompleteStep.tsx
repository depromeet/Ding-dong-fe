import Image from 'next/image';

import { Template } from '~/components/Template';
import { CharacterNameModel } from '~/types/idCard';

type CharacterCompleteStepProps = {
  characterName: CharacterNameModel;
};

type CharacterInfo = {
  title: string;
  description: string;
  image: string;
};
const characterInfo: Record<CharacterNameModel, CharacterInfo> = {
  BUDDY: {
    title: '아이디어 뱅크',
    description: '도전정신이 가득한 버디와 함께하면\n 새롭고 재밌는 경험을 할 수 있을 거예요!',
    image: '/assets/images/character-buddy.png',
  },
  TOBBY: {
    title: '자유로운 영혼',
    description:
      '자유분방하고 여유 넘치는 토비는 넘치는 끼와\n 패션센스로 가끔 주민들의 이목을 집중시켜요.',
    image: '/assets/images/character-toby.png',
  },
  PIPI: {
    title: '모두의 뮤즈',
    description:
      '감성적이고 사교적인 피피는 어느 행성을\n 가더라도 무리의 중심에서 주민들을 이끌어요.',
    image: '/assets/images/character-pipi.png',
  },
  TRUE: {
    title: '현실주의자',
    description: '신중하고 믿음직한 트루는 한번 친해지면\n 누구보다도 든든한 친구가 되어줄 거예요.',
    image: '/assets/images/character-true.png',
  },
};

export const CharacterCompleteStep = ({ characterName }: CharacterCompleteStepProps) => {
  const { title, description, image } = characterInfo[characterName];

  return (
    <Template>
      <Template.Title className="font-grey-900">
        <h1>{title}</h1>
      </Template.Title>
      <Template.Description className="font-grey-700">
        <p>{description}</p>
      </Template.Description>
      <Template.Content>
        <Image src={image} width={312} height={302} alt="character image" />
      </Template.Content>
      <Template.Button>완료</Template.Button>
    </Template>
  );
};
