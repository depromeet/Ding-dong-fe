'use client';

import { useForm } from 'react-hook-form';

import { usePostCommentCreate, usePostReplyCreate } from '~/api/domain/comment.api';
import { useGetUserInfo } from '~/api/domain/user.api';
import { Divider } from '~/components/Divider';
import { SendIcon } from '~/components/Icon';
import { TextInput, useTextInput } from '~/components/TextInput';
import { ReplyIndicator } from '~/modules/CommentInput/ReplyIndicator.client';
import { UserProfile } from '~/modules/CommentList/CommentCommon';
import { useReplyRecipientStore } from '~/stores/comment.store';
import { isEmptyText } from '~/utils/util.common';

type CommentInputProps = {
  idCardId: number;
};

type CommentFormData = {
  contents: string;
};

export const CommentInput = ({ idCardId }: CommentInputProps) => {
  //TODO: 주민증 없는 경우 댓글 작성 못한다고 input placeholder 수정

  const { data: userInfo } = useGetUserInfo();
  const { mutate: mutatePostCommentCreate } = usePostCommentCreate(idCardId, userInfo!);
  const { mutate: mutatePostReplyCreate } = usePostReplyCreate(idCardId, userInfo!);
  const { commentId } = useReplyRecipientStore();

  const { register, handleSubmit, reset } = useForm<CommentFormData>();

  const onSubmit = (data: CommentFormData) => {
    const { contents } = data;
    if (isEmptyText(contents)) return;
    if (commentId) {
      mutatePostReplyCreate({ idCardId, contents, commentId });
    } else {
      mutatePostCommentCreate({ idCardId, contents });
    }
    reset();
  };

  const { onChangeHandler } = useTextInput({
    onChange: register('contents').onChange,
  });

  return (
    <>
      {userInfo && (
        <div className="fixed bottom-0 left-0 w-full bg-white">
          <ReplyIndicator />
          <Divider className="bg-grey-200" />
          <form
            className="flex items-center gap-8pxr px-[20px] py-[8px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <UserProfile profileImageUrl={userInfo?.profileImageUrl} />
            <TextInput>
              <TextInput.Border className="rounded-[15px] px-[16px] py-[8px]">
                <div className="flex w-full flex-row">
                  <TextInput.Content
                    className="w-full bg-grey-50"
                    {...register('contents')}
                    placeholder="댓글을 남겨주세요"
                    onChange={onChangeHandler}
                  />
                  <button>
                    <SendIcon className="fill-none stroke-primary-500" />
                  </button>
                </div>
              </TextInput.Border>
            </TextInput>
          </form>
        </div>
      )}
    </>
  );
};
