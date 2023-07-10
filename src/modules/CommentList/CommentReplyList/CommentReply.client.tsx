'use client';

import {
  useDeleteCommentReplyLike,
  useDeleteReply,
  usePostLikeCommentReply,
} from '~/api/domain/comment/comment.api';
import {
  CommentOptions,
  Content,
  Header,
  LikeCount,
  LikeIcon,
  ReplySubmitButton,
  UserProfile,
} from '~/modules/CommentList/CommentCommon';
import { useLike } from '~/modules/CommentList/useLike';
import { useToastMessageStore } from '~/stores/toastMessage.store';
import { CommentModel, CommentReplyModel } from '~/types/comment';

type CommentProps = Pick<CommentModel, 'idCardId' | 'commentId' | 'writerInfo'> & CommentReplyModel;

export const CommentReply = ({
  idCardId,
  commentId,
  commentReplyId,
  content,
  createdAt,
  writerInfo,
  commentReplyLikeInfo,
}: CommentProps) => {
  const { errorToast } = useToastMessageStore();
  const { profileImageUrl, nickname } = writerInfo;
  const { isLikedByCurrentUser, likeCount, likeComment, cancelLikeComment } =
    useLike(commentReplyLikeInfo);

  const mutatePostLike = usePostLikeCommentReply({
    onError: error => {
      errorToast(error.message);
      cancelLikeComment();
    },
  });

  const mutateDeleteLike = useDeleteCommentReplyLike({
    onError: error => {
      errorToast(error.message);
      likeComment();
    },
  });

  const onClickToLike = async () => {
    likeComment();
    mutatePostLike.mutate({ idCardId, commentId, commentReplyId });
  };

  const onClickToLikeCancel = async () => {
    cancelLikeComment();
    mutateDeleteLike.mutate({ idCardId, commentId, commentReplyId });
  };

  const { mutate: mutateDeleteReply } = useDeleteReply(idCardId);

  const onClickToDeleteComment = () => {
    mutateDeleteReply({ idCardId, commentId, commentReplyId });
  };

  return (
    <li className="flex w-full gap-12pxr px-[calc(layout-sm+42px)]">
      <UserProfile profileImageUrl={profileImageUrl} />
      <div className="w-full">
        <Header nickname={nickname} createdAt={createdAt} />
        <div className="flex w-full gap-12pxr">
          <div className="w-full">
            <Content content={content} />
            <div className="mt-8pxr flex items-center gap-16pxr">
              <LikeCount likeCount={likeCount} />
              <ReplySubmitButton nickname={nickname} commentId={commentId} />
              <CommentOptions
                writerInfo={writerInfo}
                onClickToDeleteComment={onClickToDeleteComment}
              />
            </div>
          </div>
          <div>
            <LikeIcon
              isLikedByCurrentUser={isLikedByCurrentUser}
              onClickToLike={onClickToLike}
              onClickToLikeCancel={onClickToLikeCancel}
            />
          </div>
        </div>
      </div>
    </li>
  );
};
