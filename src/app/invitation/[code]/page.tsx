'use client';

import { useRouter } from 'next/navigation';

import {
  useGetInvitationCodeIsValid,
  useGetUserInfo,
  usePostPlanetJoin,
} from '~/api/domain/user.api';
import { getUserIdClient } from '~/utils/auth/getUserId.client';

const InvitationPage = ({ params }: { params: { code: string } }) => {
  const router = useRouter();
  const invitationCode = params.code;

  // TODO: 잘못된 행성 코드인 경우, 에러 처리(error.page)
  const { data: validPlanet, isLoading: isValidPlanetLoading } = useGetInvitationCodeIsValid(
    params.code,
  );
  const planetId = validPlanet?.planetId;
  const userId = getUserIdClient();
  const {
    data: userInfo,
    isRefetching,
    isInitialLoading,
  } = useGetUserInfo({
    enabled: !!(planetId && userId),
  });
  const { mutateAsync } = usePostPlanetJoin();

  const onClick = async () => {
    const searchParams = new URLSearchParams({
      redirectUri: `/invitation/${invitationCode}`,
    }).toString();
    if (planetId && userId) {
      await mutateAsync({ planetId, userId });
      if (userInfo?.isCharacterCreated) {
        router.push(`/planet/${planetId}`);
      } else {
        router.push(`/onboarding?${searchParams}`);
      }
    } else {
      router.push(`/auth/signin?${searchParams}`);
    }
  };
  if (isValidPlanetLoading) return null;

  return (
    <div>
      <h1>당신을 디프만 행성으로 초대합니다</h1>
      <button disabled={isInitialLoading || isRefetching} onClick={onClick}>
        초대 수락하기
      </button>
    </div>
  );
};

export default InvitationPage;
