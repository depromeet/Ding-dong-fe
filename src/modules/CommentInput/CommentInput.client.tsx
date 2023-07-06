'use client';

import { useGetCommunityUserInfo } from '~/api/domain/community.api';
import { ActiveCommentInput } from '~/modules/CommentInput/ActiveCommentInput.client';
import { DisabledCommentInput } from '~/modules/CommentInput/DisabledCommentInput.client';

type CommentInputProps = {
  idCardId: number;
  communityId: number;
};

export const CommentInput = ({ idCardId, communityId }: CommentInputProps) => {
  const { data: userInfo } = useGetCommunityUserInfo(communityId);

  return (
    <>
      {userInfo ? (
        <ActiveCommentInput
          myInfoInInCommunityDto={userInfo.myInfoInInCommunityDto}
          idCardId={idCardId}
          communityId={communityId}
        />
      ) : (
        <DisabledCommentInput communityId={communityId} />
      )}
    </>
  );
};
