import { useConfirmPopup } from '~/components/ConfirmPopup';
import { ConfirmDeleteComment } from '~/components/ConfirmPopup/ConfirmDeleteComment';

export const DeleteButton = () => {
  const { isOpen, openPopup, closePopup, confirm } = useConfirmPopup();

  const deleteComment = () => {
    // TODO: 삭제로직 추가하기
  };

  const onDeleteComment = async () => {
    const isOk = await openPopup();
    closePopup();
    if (isOk) {
      deleteComment();
    }
  };

  return (
    <>
      <button className="text-detail text-grey-500" onClick={() => onDeleteComment()}>
        삭제
      </button>
      {isOpen && <ConfirmDeleteComment confirm={confirm} />}
    </>
  );
};
