'use client';

import React, { useEffect } from 'react';

import { Divider } from '~/components/Divider';
import { CancelIcon } from '~/components/Icon';
import { useReplyRecipientStore } from '~/stores/comment.store';

export const ReplyIndicator = () => {
  const { nickname, clear } = useReplyRecipientStore();

  useEffect(() => {
    return () => {
      clear();
    };
  }, []);

  return nickname ? (
    <>
      <Divider className="bg-grey-200" />
      <div className="flex justify-between bg-grey-200 px-20pxr py-10pxr text-b3 text-grey-500">
        <span>{nickname}님에게 답글 남기는 중</span>
        <CancelIcon className="p-3pxr" onClick={() => clear()} />
      </div>
    </>
  ) : (
    <></>
  );
};
