'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

import {
  Content,
  DisplayLike,
  Header,
  LikeIcon,
  ReplyShowButton,
  ReplySubmitButton,
  UserProfile,
} from '~/modules/CommentContainer/CommentCommon';
import { CommentReplyList } from '~/modules/CommentContainer/CommentReplyContainer';
import { CommentModel } from '~/types/comment';

type CommentProps = CommentModel;

export const Comment = ({
  commentId,
  content,
  createdAt,
  writerInfo,
  commentReplyLikeInfo,
  commentReplyInfos,
}: CommentProps) => {
  const { userId, profileImageUrl, nickname } = writerInfo;
  const [isShowReplyList, setIsShowReplyList] = useState(false);

  const onClickShowReplyList = () => {
    setIsShowReplyList(true);
  };

  const onClickHideReplyList = () => {
    setIsShowReplyList(false);
  };

  return (
    <li className="flex w-full gap-12pxr px-layout-sm">
      <UserProfile profileImageUrl={profileImageUrl} />
      <div>
        <Header nickname={nickname} createdAt={createdAt} />
        <div className="flex gap-12pxr">
          <div>
            <Content content={content} />
            <div className="mt-8pxr flex gap-16pxr">
              <DisplayLike commentReplyLikeInfo={commentReplyLikeInfo} />
              <ReplySubmitButton />
            </div>
          </div>
          <div>
            <LikeIcon commentReplyLikeInfo={commentReplyLikeInfo} />
          </div>
        </div>
        <ReplyShowButton
          isShowReplyList={isShowReplyList}
          onClickHideReplyList={onClickHideReplyList}
          onClickShowReplyList={onClickShowReplyList}
          commentReplyInfos={commentReplyInfos}
        />
        <CommentReplyList isShowReplyList={isShowReplyList} commentReplyInfos={commentReplyInfos} />
      </div>
    </li>
  );
};
