'use client';
import { useDeleteUser } from '~/api/domain/user.api';
import { useConfirmPopup } from '~/components/ConfirmPopup';
import { SimpleConfirmPopup } from '~/components/ConfirmPopup/SimpleConfirmPopup/SimpleConfirmPopup.client';
import { Menu } from '~/components/Menu';

export const UserMenu = () => {
  const onClickLogout = () => {
    console.log('로그 아웃 로직 추가 예정');
  };

  const { mutate } = useDeleteUser();
  const onClickSignOut = async () => {
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
        <Menu.Header>계정 관리</Menu.Header>
        <Menu.Element onClick={onClickLogout}>
          <span>로그아웃</span>
        </Menu.Element>
        <Menu.Element onClick={onClickSignOut}>
          <span>회원 탈퇴</span>
        </Menu.Element>
      </Menu>
      {isOpen && (
        <SimpleConfirmPopup
          confirm={confirm}
          title="회원탈퇴"
          description="정말로 회원탈퇴를 하시겠습니까?"
          confirmText="회원탈퇴"
          cancelText="취소"
        />
      )}
    </>
  );
};
