'use client';
import { useState } from 'react';

import {
  useDeleteComment,
  useDeleteCommentLike,
  usePostLikeComment,
} from '~/api/domain/comment/comment.api';
import {
  CommentOptions,
  Content,
  Header,
  LikeCount,
  LikeIcon,
  ReplyHideButton,
  ReplyShowButton,
  ReplySubmitButton,
  UserProfile,
} from '~/modules/CommentList/CommentCommon';
import { CommentReplyList } from '~/modules/CommentList/CommentReplyList';
import { useLike } from '~/modules/CommentList/useLike';
import { useToastMessageStore } from '~/stores/toastMessage.store';
import { CommentModel } from '~/types/comment';

type CommentProps = CommentModel;

export const Comment = ({
  idCardId,
  commentId,
  content,
  createdAt,
  writerInfo,
  commentLikeInfo,
  repliesCount,
}: CommentProps) => {
  const { errorToast } = useToastMessageStore();
  const { profileImageUrl, nickname } = writerInfo;
  const [isShowReplyList, setIsShowReplyList] = useState(false);
  const { isLikedByCurrentUser, likeCount, likeComment, cancelLikeComment } =
    useLike(commentLikeInfo);

  const mutatePostLike = usePostLikeComment({
    onError: error => {
      errorToast(error.message);
      cancelLikeComment();
    },
  });

  const mutateDeleteLike = useDeleteCommentLike({
    onError: error => {
      errorToast(error.message);
      likeComment();
    },
  });

  const onClickToLike = async () => {
    likeComment();
    mutatePostLike.mutate({ idCardId, commentId });
  };

  const onClickToLikeCancel = async () => {
    cancelLikeComment();
    mutateDeleteLike.mutate({ idCardId, commentId });
  };

  const onClickShowReplyList = () => {
    setIsShowReplyList(true);
  };

  const onClickHideReplyList = () => {
    setIsShowReplyList(false);
  };

  const { mutate: mutateDeleteComment } = useDeleteComment(idCardId);

  const onClickToDeleteComment = () => {
    mutateDeleteComment({ idCardId, commentId });
  };

  return (
    <li className="flex w-full gap-12pxr px-layout-sm">
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
        <ReplyShowButton
          isShowReplyList={isShowReplyList}
          onClickShowReplyList={onClickShowReplyList}
          repliesCount={repliesCount}
        />
        <CommentReplyList
          idCardId={idCardId}
          commentId={commentId}
          isShowReplyList={isShowReplyList}
        />
        <div className="mt-24pxr">
          <ReplyHideButton
            isShowReplyList={isShowReplyList}
            onClickHideReplyList={onClickHideReplyList}
          />
        </div>
      </div>
    </li>
  );
};
