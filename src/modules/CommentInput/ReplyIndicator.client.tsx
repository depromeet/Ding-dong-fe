'use client';

import React from 'react';

import { Divider } from '~/components/Divider';
import { useReplyRecipientStore } from '~/stores/comment.store';

export const ReplyIndicator = () => {
  const { nickname } = useReplyRecipientStore();
  return nickname ? (
    <>
      <Divider className="bg-grey-200" />
      <div className="bg-grey-200 px-20pxr py-10pxr text-b3 text-grey-500">
        <span>{nickname}님에게 답글 남기는 중</span>
      </div>
    </>
  ) : (
    <></>
  );
};
