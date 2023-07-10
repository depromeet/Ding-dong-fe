'use client';

import { useEffect, useState } from 'react';

import { DeleteButton } from '~/modules/CommentList/CommentCommon/DeleteButton.client';
import { ReportButton } from '~/modules/CommentList/CommentCommon/ReportButton.client';
import { CommentModel } from '~/types/comment';
import { getUserIdClient } from '~/utils/auth/getUserId.client';

type CommentOptionsProps = Pick<CommentModel, 'writerInfo'> & {
  onClickToDeleteComment: VoidFunction;
};

export const CommentOptions = ({ writerInfo, onClickToDeleteComment }: CommentOptionsProps) => {
  const { userId: writerId } = writerInfo;
  const userId = getUserIdClient();

  const [isMine, setIsMine] = useState(false);

  const isWriterSameAsUser = userId === writerId;

  // Text content does not match server-rendered HTML 이슈로 useEffect로 분리처리
  useEffect(() => {
    setIsMine(isWriterSameAsUser);
  }, [isWriterSameAsUser, userId, writerId]);

  return (
    <>
      {isMine ? <DeleteButton onClickToDeleteComment={onClickToDeleteComment} /> : <ReportButton />}
    </>
  );
};
