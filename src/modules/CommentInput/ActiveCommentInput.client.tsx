'use client';
import { useForm } from 'react-hook-form';

import { usePostCommentCreate, usePostReplyCreate } from '~/api/domain/comment/comment.api';
import { Divider } from '~/components/Divider';
import { SendIcon } from '~/components/Icon';
import { TextArea, useTextArea } from '~/components/TextArea';
import { ReplyIndicator } from '~/modules/CommentInput/ReplyIndicator.client';
import { UserProfile } from '~/modules/CommentList/CommentCommon';
import { useReplyRecipientStore } from '~/stores/comment.store';
import { CommunityUserInfoModel } from '~/types/community';
import { isEmptyText } from '~/utils/util.common';

type ActiveCommentInputProps = {
  idCardId: number;
  communityId: number;
  myInfoInInCommunityDto: CommunityUserInfoModel;
};
type CommentFormData = {
  contents: string;
};

export const ActiveCommentInput = ({
  idCardId,
  communityId,
  myInfoInInCommunityDto,
}: ActiveCommentInputProps) => {
  const { mutate: mutatePostCommentCreate } = usePostCommentCreate(idCardId, communityId);
  const { mutate: mutatePostReplyCreate } = usePostReplyCreate(idCardId, communityId);
  const { commentId, clear } = useReplyRecipientStore();

  const { register, handleSubmit, reset } = useForm<CommentFormData>({
    defaultValues: {
      contents: '',
    },
  });

  const onSubmit = (data: CommentFormData) => {
    const { contents } = data;
    if (isEmptyText(contents)) return;
    if (commentId) {
      mutatePostReplyCreate({ idCardId, contents, commentId });
      clear();
    } else {
      mutatePostCommentCreate({ idCardId, contents });
    }
    reset();
  };

  const { onChangeHandler, value: contents } = useTextArea({
    onChange: register('contents').onChange,
  });

  return (
    <div>
      <ReplyIndicator />
      <Divider className="bg-grey-200" />
      <form
        className="flex items-end gap-8pxr px-[20px] py-[8px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* FIXME: default profile url로 수정 */}
        <div className="mb-10pxr">
          <UserProfile profileImageUrl={myInfoInInCommunityDto.profileImageUrl || ''} />
        </div>
        <TextArea>
          <TextArea.Border className="rounded-[15px] px-[16px] py-[8px]">
            <div className="flex w-full flex-row items-end">
              <TextArea.Content
                className="max-h-105pxr w-full resize-none bg-grey-50"
                {...register('contents')}
                placeholder="댓글을 남겨주세요"
                onChange={onChangeHandler}
                value={contents}
                isAutoSize
              />
              <button>
                <SendIcon className="fill-none stroke-primary-500" />
              </button>
            </div>
          </TextArea.Border>
        </TextArea>
      </form>
    </div>
  );
};
