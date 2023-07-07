import Image from 'next/image';

import { CommentWriterIntoModel } from '~/types/comment';

type UserProfileProps = Pick<CommentWriterIntoModel, 'profileImageUrl'>;

export const UserProfile = ({ profileImageUrl }: UserProfileProps) => {
  return (
    <div className="h-32pxr w-32pxr flex-shrink-0 overflow-hidden rounded-full">
      <Image
        width={32}
        height={32}
        src={profileImageUrl}
        className="object-cover"
        alt="profile image"
      />
    </div>
  );
};
