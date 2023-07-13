'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useGetUserInfo } from '~/api/domain/user.api';
import { Template } from '~/components/Template';
import { CharacterNameModel } from '~/types/idCard';
import { deleteCookie, getCookie } from '~/utils/cookie.util';
import { ROUTE_COOKIE_KEYS } from '~/utils/route/route';

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
    title: '당신의 캐릭터는\n 아이디어 뱅크 버디에요!',
    description: '도전정신이 가득한 버디와 함께하면\n 새롭고 재밌는 경험을 할 수 있을 거예요!',
    image: '/assets/images/character-buddy.png',
  },
  TOBBY: {
    title: '당신의 캐릭터는\n 자유로운 영혼 토비에요!',
    description:
      '자유분방하고 여유 넘치는 토비는 넘치는 끼와\n 패션센스로 가끔 주민들의 이목을 집중시켜요.',
    image: '/assets/images/character-toby.png',
  },
  PIPI: {
    title: '당신의 캐릭터는\n 모두의 뮤즈 피피에요!',
    description:
      '감성적이고 사교적인 피피는 어느 행성을\n 가더라도 무리의 중심에서 주민들을 이끌어요.',
    image: '/assets/images/character-pipi.png',
  },
  TRUE: {
    title: '당신의 캐릭터는\n 현실주의자 트루에요!',
    description: '신중하고 믿음직한 트루는 한번 친해지면\n 누구보다도 든든한 친구가 되어줄 거예요.',
    image: '/assets/images/character-true.png',
  },
};

export const CharacterCompleteStep = ({ characterName }: CharacterCompleteStepProps) => {
  const { title, description, image } = characterInfo[characterName];
  const { data } = useGetUserInfo();
  const communityIds = data?.userProfileDto.communityIds;
  const router = useRouter();
  const onButtonClick = () => {
    const redirectUri = getCookie(ROUTE_COOKIE_KEYS.redirectUri);
    if (redirectUri) {
      deleteCookie(ROUTE_COOKIE_KEYS.redirectUri);
      return router.push(redirectUri);
    }

    return communityIds && communityIds.length > 0
      ? router.push(`/planet/${communityIds[0]}`)
      : router.push('/planet');
  };

  return (
    <Template className="h-[calc(100vh-50px)]">
      <Template.Title className="text-grey-900">
        <h1>{title}</h1>
      </Template.Title>
      <Template.Description className="mt-17pxr text-grey-700">
        <p>{description}</p>
      </Template.Description>
      <Template.Content>
        <Image src={image} width={312} height={302} alt="character image" />
      </Template.Content>
      <Template.Button onClick={onButtonClick}>완료</Template.Button>
    </Template>
  );
};
