'use client';

import { useRouter } from 'next/navigation';

import { getInvitationCodeIsValid, postPlanetJoin } from '~/api/domain/user.api';
import { getUserIdClientTemp } from '~/utils/auth/getUserId.client';

const InvitationPage = async ({ params }: { params: { code: string } }) => {
  const router = useRouter();
  const invitationCode = params.code;

  // 잘못된 행성 코드인 경우, 에러 처리(error.page)
  // 로그인하지 않은 사용자의 경우, /auth/signin?invitationCode 로 보내야 함
  const { planetId } = await getInvitationCodeIsValid(params.code);
  const userId = getUserIdClientTemp();

  const onClick = async () => {
    const searchParams = new URLSearchParams({ invitationCode }).toString();
    if (userId) {
      const success = await postPlanetJoin({ planetId, userId });
      // 캐릭터 생성 여부를 알아냄
      const isCharacterCreation = true;
      if (isCharacterCreation) {
        router.replace(`/planet/${planetId}`);
      } else {
        router.replace(`/onboarding?${searchParams}`);
      }
    } else {
      router.replace(`/auth/signin?${searchParams}`);
    }
  };

  return (
    <div>
      <h1>행성으로 이동 중</h1>
      <button onClick={onClick}>초대 수락하기</button>
    </div>
  );
};

export default InvitationPage;
