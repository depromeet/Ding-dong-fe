'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

import { useDeleteCommentLike, usePostLikeComment } from '~/api/domain/comment.api';
import {
  Content,
  DeleteButton,
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
import { CommentModel } from '~/types/comment';

type CommentProps = CommentModel;

export const Comment = ({
  idCardId,
  commentId,
  content,
  createdAt,
  writerInfo,
  commentLikeInfo,
  commentReplyInfos,
}: CommentProps) => {
  const { userId, profileImageUrl, nickname } = writerInfo;
  const [isShowReplyList, setIsShowReplyList] = useState(false);
  const { isLikedByCurrentUser, likeCount, likeComment, cancelLikeComment } =
    useLike(commentLikeInfo);
  const mutatePostLike = usePostLikeComment({
    onError: () => {
      // TODO toast error
      cancelLikeComment();
    },
  });

  const mutateDeleteLike = useDeleteCommentLike({
    onError: () => {
      // TODO toast error
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

  return (
    <li className="flex w-full gap-12pxr px-layout-sm">
      <UserProfile profileImageUrl={profileImageUrl} />
      <div className="w-full">
        <Header nickname={nickname} createdAt={createdAt} />
        <div className="flex w-full gap-12pxr">
          <div className="w-full">
            <Content content={content} />
            <div className="mt-8pxr flex gap-16pxr">
              <LikeCount likeCount={likeCount} />
              <ReplySubmitButton nickname={nickname} commentId={commentId} />
              <DeleteButton />
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
          commentReplyInfos={commentReplyInfos}
        />
        <CommentReplyList
          idCardId={idCardId}
          commentId={commentId}
          isShowReplyList={isShowReplyList}
          commentReplyInfos={commentReplyInfos}
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
