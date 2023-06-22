'use client';

import {
  Content,
  Header,
  LikeCount,
  LikeIcon,
  ReplySubmitButton,
  UserProfile,
} from '~/modules/CommentContainer/CommentCommon';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommentReplyModel } from '~/types/comment';

type CommentProps = CommentReplyModel;

export const CommentReply = ({
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
      <div>
        <Header nickname={nickname} createdAt={createdAt} />
        <div className="flex gap-12pxr">
          <div>
            <Content content={content} />
            <div className="mt-8pxr flex gap-16pxr">
              <LikeCount commentReplyLikeInfo={commentReplyLikeInfo} />
              <ReplySubmitButton />
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
