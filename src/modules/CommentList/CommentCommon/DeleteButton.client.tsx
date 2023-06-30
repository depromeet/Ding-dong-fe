import { useConfirmPopup } from '~/components/ConfirmPopup';
import { ConfirmDeleteComment } from '~/components/ConfirmPopup/ConfirmDeleteComment';

type DeleteButtonProps = {
  onClickToDeleteComment: () => void;
};

export const DeleteButton = ({ onClickToDeleteComment }: DeleteButtonProps) => {
  const { isOpen, openPopup, closePopup, confirm } = useConfirmPopup();

  const deleteComment = () => {
    onClickToDeleteComment();
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
      <button className="text-detail text-grey-400" onClick={() => onDeleteComment()}>
        삭제
      </button>
      {isOpen && <ConfirmDeleteComment confirm={confirm} />}
    </>
  );
};
