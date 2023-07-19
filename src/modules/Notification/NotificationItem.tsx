'use client';

import { useRouter } from 'next/navigation';

import { useReadNotification } from '~/api/domain/notification.api';
import {
  NOTIFICATION_TYPE,
  NOTIFICATION_TYPE_ACTION,
  NotificationModel,
} from '~/types/notification';
import { getCreatedAtFormat } from '~/utils/time.util';

import { UserProfile } from '../CommentList/CommentCommon';

export const NotificationItem = ({
  notificationId,
  notificationType,
  notificationStatus,
  createdAt,
  communityDto,
  commentDto,
  userDto,
  idCardDto,
}: NotificationModel) => {
  const { mutate } = useReadNotification();
  const router = useRouter();
  const onClick = () => {
    mutate(notificationId);
    router.push(`/planet/${communityDto.communityId}/id-card/${idCardDto.idCardId}`);
  };

  return (
    <li className="flex list-none gap-3" onClick={onClick}>
      <div className="relative">
        {notificationStatus === 'UNREAD' && (
          <span className="absolute -left-10pxr top-13pxr h-6pxr w-6pxr rounded-full bg-blue-500"></span>
        )}
        <UserProfile profileImageUrl={userDto.fromUserProfileImageUrl} />
      </div>
      <div className={notificationStatus === 'READ' ? 'text-gray-400' : ''}>
        <p className="mb-2 text-b2 font-normal">
          <b className={`font-medium ${notificationStatus === 'READ' ? 'text-gray-500' : ''}`}>
            {userDto.fromUserNickname}
          </b>
          님이{' '}
          <b className={`font-medium ${notificationStatus === 'READ' ? 'text-gray-500' : ''}`}>
            회원님의 {NOTIFICATION_TYPE[notificationType]}
          </b>
          {NOTIFICATION_TYPE_ACTION[notificationType]}: {commentDto.comment}
        </p>
        <div
          className={`
            text-detail ${notificationStatus === 'UNREAD' ? 'text-gray-500' : 'text-gray-400'},
        `}
        >
          <span className="mr-2">{communityDto.communityName}</span>
          <span>{getCreatedAtFormat(createdAt)} 전</span>
        </div>
      </div>
    </li>
  );
};
