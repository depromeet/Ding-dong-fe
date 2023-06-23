'use client';

import {
  Content,
  Header,
  LikeCount,
  LikeIcon,
  ReplySubmitButton,
  UserProfile,
} from '~/modules/CommentList/CommentCommon';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommentReplyDeleteRequest, CommentReplyModel } from '~/types/comment';

import { CommentReplyDeleteButton } from './CommentReplyDeleteButton.client';

type CommentProps = CommentReplyModel & CommentReplyDeleteRequest;

export const CommentReply = ({
  idCardsId,
  commentId,
  commentReplyId,
  content,
  createdAt,
  writerInfo,
  commentReplyLikeInfo,
}: CommentProps) => {
  const { userId, profileImageUrl, nickname } = writerInfo;

  return (
    <li className="flex w-full gap-12pxr px-[calc(layout-sm+42px)]">
      <UserProfile profileImageUrl={profileImageUrl} />
      <div className="w-full">
        <Header nickname={nickname} createdAt={createdAt} />
        <div className="flex w-full gap-12pxr">
          <div className="w-full">
            <Content content={content} />
            <div className="mt-8pxr flex gap-16pxr">
              <LikeCount commentReplyLikeInfo={commentReplyLikeInfo} />
              <ReplySubmitButton />
              <CommentReplyDeleteButton
                idCardsId={idCardsId}
                commentId={commentId}
                commentReplyId={commentReplyId}
              />
            </div>
          </div>
          <div>
            <LikeIcon commentReplyLikeInfo={commentReplyLikeInfo} />
          </div>
        </div>
      </div>
    </li>
  );
};
