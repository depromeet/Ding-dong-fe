'use client';

import { useRouter } from 'next/navigation';

import { useGetInvitationCodeIsValid, usePostCommunityJoin } from '~/api/domain/community.api';
import { useGetUserInfo } from '~/api/domain/user.api';
import { Template } from '~/components/Template';
import { getUserIdClient } from '~/utils/auth/getUserId.client';
import { STORAGE_REDIRECT_URI_KEY } from '~/utils/route/route';

const title = '당신을 디프만 행성으로\n 초대합니다';

const InvitationPage = ({ params }: { params: { code: string } }) => {
  const router = useRouter();
  const invitationCode = params.code;

  // TODO: 잘못된 행성 코드인 경우, 에러 처리(error.page)
  const { data: validPlanet, isLoading: isValidPlanetLoading } = useGetInvitationCodeIsValid(
    params.code,
  );
  const communityId = validPlanet?.communityId;
  const userId = getUserIdClient();
  const {
    data: userInfo,
    isRefetching,
    isInitialLoading,
  } = useGetUserInfo({
    enabled: !!(communityId && userId),
  });
  const { mutateAsync } = usePostCommunityJoin();

  const onClick = async () => {
    if (communityId && userId) {
      if (window.sessionStorage.getItem(STORAGE_REDIRECT_URI_KEY))
        window.sessionStorage.removeItem(STORAGE_REDIRECT_URI_KEY);
      await mutateAsync({ communityId });
      if (userInfo?.isCharacterCreated) {
        router.push(`/planet/${communityId}`);
      } else {
        router.push('/onboarding');
      }
    } else {
      window.sessionStorage.setItem(STORAGE_REDIRECT_URI_KEY, `/invitation/${invitationCode}`);
      router.push('/auth/signin');
    }
  };
  if (isValidPlanetLoading) return null;

  return (
    <Template>
      <Template.Title className="text-grey-900">
        <h1>{title}</h1>
      </Template.Title>
      <Template.Content />
      <Template.Button disabled={isInitialLoading || isRefetching} onClick={onClick}>
        시작하기
      </Template.Button>
    </Template>
  );
};

export default InvitationPage;
