'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useGetInvitationCodeIsValid, usePostCommunityJoin } from '~/api/domain/community.api';
import { useGetUserInfo } from '~/api/domain/user.api';
import { Template } from '~/components/Template';
import { useToastMessageStore } from '~/stores/toastMessage.store';
import { getUserIdClient } from '~/utils/auth/getUserId.client';
import { setCookie } from '~/utils/cookie.util';
import { ROUTE_COOKIE_KEYS } from '~/utils/route/route';

const InvitationPage = ({ params }: { params: { code: string } }) => {
  const router = useRouter();
  const { errorToast } = useToastMessageStore();
  const invitationCode = params.code;

  // TODO: 잘못된 행성 코드인 경우, 에러 메시지 보여주기(후순위)
  const { data: validPlanet, isLoading: isValidPlanetLoading } = useGetInvitationCodeIsValid(
    params.code,
    {
      onError: () => {
        router.replace('/');
      },
    },
  );
  const communityId = validPlanet?.checkInvitationCodeDto.communityId;
  const title = `당신을 ${validPlanet?.checkInvitationCodeDto.name || ''} 행성으로\n 초대합니다`;

  const userId = getUserIdClient();
  const { data, isRefetching, isInitialLoading } = useGetUserInfo({
    enabled: !!(communityId && userId),
  });

  const { mutateAsync } = usePostCommunityJoin({
    onError: error => {
      if (error.statusCode === 300) {
        return false;
      }

      errorToast(error.reason);
    },
  });

  const onClick = async () => {
    if (communityId && userId) {
      await mutateAsync({ communityId });
      if (data?.userProfileDto.characterType) {
        router.push(`/planet/${communityId}`);
      } else {
        setCookie(ROUTE_COOKIE_KEYS.redirectUri, `/planet/${communityId}`);
        router.push('/onboarding');
      }
    } else {
      setCookie(ROUTE_COOKIE_KEYS.redirectUri, `/invitation/${invitationCode}`);
      router.push('/auth/signin');
    }
  };
  if (isValidPlanetLoading) return null;

  return (
    <Template className="relative mt-none-t-nav h-full-screen bg-[linear-gradient(180deg,_#fff_5.75%,_#e0deff_48.77%)]">
      <Image
        src="/assets/images/invitation.png"
        width={0}
        height={0}
        sizes="100vw"
        className="absolute left-0 top-0 mt-none-t-nav max-h-full-screen w-full object-cover"
        alt="invitation image"
      />
      <Template.Title className="z-mid2 mt-50pxr text-grey-900">
        <h1>{title}</h1>
      </Template.Title>
      <Template.Content />
      <Template.Button
        disabled={isInitialLoading || isRefetching}
        onClick={onClick}
        className="z-mid2"
      >
        시작하기
      </Template.Button>
    </Template>
  );
};

export default InvitationPage;
