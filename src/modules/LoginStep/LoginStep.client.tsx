'use client';

// FIXME: tailwind가 Swiper에 pagination잘 안먹혀서 어쩔 수 없이 css를 사용했어요
import './style.css';

import Image from 'next/image';

import { Swiper, SwiperSlide } from '~/components/Swiper';
import { AppleLoginButton } from '~/modules/LoginStep/AppleLoginButton.client';
import { KakaoLoginButton } from '~/modules/LoginStep/kakaoLoginButton.client';
import { KAKAO_PROVIDER } from '~/utils/auth/loginProviders';

type SubStepType = 'newPlanet' | 'idCard' | 'talk';

type SubStepDetailType = {
  id: SubStepType;
  image: string;
  label: string;
  helperText: string;
};

const subStepList: SubStepDetailType[] = [
  {
    id: 'newPlanet',
    image: 'rocket',
    label: '새로운 행성으로 가볼까요?',
    helperText:
      '행성은 서로를 알아가고 소통할 수 있는 공간이에요.\n나만의 행성을 만들어 팀원을 초대해 보세요.',
  },
  {
    id: 'idCard',
    image: 'id_card_creation',
    label: '주민증으로 나를 소개해요',
    helperText:
      '행성에서 나만의 주민증을 만들 수 있어요.\n나만의 개성을 담은 주민증으로 나를 소개하세요!',
  },
  {
    id: 'talk',
    image: 'talk',
    label: '주민들에게 말을 걸어보세요',
    helperText: '다른 주민들의 주민증을 살펴보세요.\n생각하지 못했던 공통점을 찾을 수 있을 거에요.',
  },
];

export const LoginStep = () => {
  return (
    <div>
      <Swiper
        slidesPerView="auto"
        pagination={{
          clickable: true,
        }}
        allowTouchMove
      >
        {subStepList.map(({ id, image, label, helperText }) => (
          <SwiperSlide key={id}>
            <div>
              <h2 className="text-h2 text-grey-900">{label}</h2>
              <p className="mt-11pxr text-b1 text-grey-500">{helperText}</p>
              <div className="mt-18pxr flex flex-col items-center justify-center">
                <Image
                  src={`/assets/images/${image}.png`}
                  alt="explain id card"
                  object-fit="contain"
                  object-position="center"
                  width={334}
                  height={334}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-28pxr flex flex-col gap-16pxr">
        <KakaoLoginButton provider={KAKAO_PROVIDER} />
        <AppleLoginButton />
      </div>
    </div>
  );
};
