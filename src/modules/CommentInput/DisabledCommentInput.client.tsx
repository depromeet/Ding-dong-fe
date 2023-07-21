'use client';
import { useRouter } from 'next/navigation';

import { useConfirmPopup } from '~/components/ConfirmPopup';
import { ConfirmCreateIdCard } from '~/components/ConfirmPopup/ConfirmCreateIdCard';
import { SendIcon } from '~/components/Icon';
import { TextInput } from '~/components/TextInput';

type DisabledCommentInputProps = {
  communityId: number;
};

export const DisabledCommentInput = ({ communityId }: DisabledCommentInputProps) => {
  const router = useRouter();
  const {
    isOpen: isConfirmCreateIdCardOpen,
    openPopup: openConfirmCreateIdCardPopup,
    closePopup: closeConfirmCreateIdCardPopup,
    confirm: createIdCard,
  } = useConfirmPopup();

  const onClickDisabledCommentInput = async () => {
    const isOk = await openConfirmCreateIdCardPopup();
    closeConfirmCreateIdCardPopup();
    if (isOk) {
      router.push(`/planet/${communityId}/id-card/create`);
    }
  };
  return (
    <div onClick={onClickDisabledCommentInput}>
      <div className="flex items-center gap-8pxr px-[20px] py-[8px]">
        <TextInput>
          <TextInput.Border className="rounded-[15px] px-[16px] py-[8px]" disabled>
            <div className="flex w-full flex-row">
              <TextInput.Content
                className="w-full bg-grey-50"
                placeholder="주민증이 없으면 댓글을 남길 수 없어요."
                disabled
              />
              <button>
                <SendIcon className="fill-none stroke-primary-500" />
              </button>
            </div>
          </TextInput.Border>
        </TextInput>
      </div>
      {isConfirmCreateIdCardOpen && <ConfirmCreateIdCard confirm={createIdCard} />}
    </div>
  );
};
