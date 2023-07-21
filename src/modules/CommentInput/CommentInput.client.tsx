'use client';

import { useGetCommunityUserInfo } from '~/api/domain/community.api';
import { ActiveCommentInput } from '~/modules/CommentInput/ActiveCommentInput.client';
import { DisabledCommentInput } from '~/modules/CommentInput/DisabledCommentInput.client';

type CommentInputProps = {
  idCardId: number;
  communityId: number;
};

export const CommentInput = ({ idCardId, communityId }: CommentInputProps) => {
  const { data } = useGetCommunityUserInfo(communityId);

  const shouldActiveCommentInput = data?.myInfoInInCommunityDto.isExistsIdCard;

  return (
    <div className="fixed bottom-0 left-1/2 w-full max-w-content -translate-x-1/2 transform bg-white ">
      {shouldActiveCommentInput ? (
        <ActiveCommentInput
          myInfoInInCommunityDto={data.myInfoInInCommunityDto}
          idCardId={idCardId}
          communityId={communityId}
        />
      ) : (
        <DisabledCommentInput communityId={communityId} />
      )}
    </div>
  );
};
