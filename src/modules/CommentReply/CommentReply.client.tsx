'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from 'next/image';

import { HeartFillIcon, HeartIcon } from '~/components/Icon';
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
    <div className="flex w-full gap-12pxr px-[calc(layout-sm+42px)]">
      <div className="h-32pxr w-32pxr flex-shrink-0 overflow-hidden rounded-full">
        <Image width={32} height={32} src={profileImageUrl} alt="profile image" />
      </div>
      <div>
        <h4 className="flex gap-4pxr">
          <span className="text-b3 text-gray-800">{nickname}</span>
          <span className="text-b3 text-grey-500">1분전</span>
        </h4>
        <div className="flex gap-12pxr">
          <div>
            <p className="text-b3 text-black "> {content}</p>
            <button className="mt-4pxr text-b3 text-grey-600">자세히보기</button>
            <div className="mt-8pxr flex gap-16pxr">
              <span className="text-detail text-grey-500">좋아요 N개</span>
              <button className="text-detail text-grey-500">답글 달기</button>
            </div>
          </div>
          <div>
            {commentReplyLikeInfo.isLikedByCurrentUser ? (
              <HeartFillIcon className="fill-blue-500" />
            ) : (
              <HeartIcon className="fill-grey-400" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
