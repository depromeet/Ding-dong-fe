'use client';

import {
  Content,
  Header,
  LikeCount,
  ReplySubmitButton,
  UserProfile,
} from '~/modules/CommentList/CommentCommon';
import { CommentReplyLike } from '~/modules/CommentList/CommentReplyList/CommentReplyLike.client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommentModel, CommentReplyModel } from '~/types/comment';

type CommentProps = Pick<CommentModel, 'commentId'> &
  CommentReplyModel & {
    idCardsId: number;
  };

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
            </div>
          </div>
          <div>
            <CommentReplyLike
              idCardsId={idCardsId}
              commentId={commentId}
              commentReplyId={commentReplyId}
              commentReplyLikeInfo={commentReplyLikeInfo}
            />
          </div>
        </div>
      </div>
    </li>
  );
};
