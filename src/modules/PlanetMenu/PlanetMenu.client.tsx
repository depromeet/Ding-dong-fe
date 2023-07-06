'use client';
import { useSearchParams } from 'next/navigation';

import { useGetCommunityDetail, useWithdrawalCommunity } from '~/api/domain/community.api';
import { useConfirmPopup } from '~/components/ConfirmPopup';
import { SimpleConfirmPopup } from '~/components/ConfirmPopup/SimpleConfirmPopup/SimpleConfirmPopup.client';
import { Menu } from '~/components/Menu';

export const PlanetMenu = () => {
  const searchParams = useSearchParams();
  const communityIdParam = searchParams.get('communityId');
  const communityId = isNaN(Number(communityIdParam)) ? -1 : Number(communityIdParam);
  const { mutate } = useWithdrawalCommunity(communityId);
  const { data: communityDetail } = useGetCommunityDetail(communityId);

  const onClickEscapePlanet = async () => {
    const isOk = await openPopup();
    closePopup();
    if (isOk) {
      mutate();
    }
  };

  const { isOpen, openPopup, closePopup, confirm } = useConfirmPopup();

  return (
    <>
      <Menu className="px-layout-sm">
        <Menu.Header>행성 관리</Menu.Header>
        <Menu.Element onClick={onClickEscapePlanet}>
          <span>행성 떠나기</span>
        </Menu.Element>
      </Menu>
      {isOpen && (
        <SimpleConfirmPopup
          confirm={confirm}
          title="행성 탈퇴"
          description={`${communityDetail?.communityDetailsDto.title} 정말로 떠나시겠습니까?`}
          confirmText="행성 탈퇴"
          cancelText="취소"
        />
      )}
    </>
  );
};
