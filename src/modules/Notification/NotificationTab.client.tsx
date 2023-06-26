'use client';

import { useState } from 'react';

import { NotificationTabItem } from './NotificationTabItem.client';

// TODO: 추후 기능 추가되면 types로 이동
export type CommunityNotification = {
  communityId: number;
  title: string;
  logoImageUrl?: string;
  hasNewNotification: boolean;
};
type NotificationTabProps = {
  communities: CommunityNotification[];
};

const AllCommunity: CommunityNotification = {
  communityId: 0,
  title: '전체',
  hasNewNotification: false,
};

export const NotificationTab = ({ communities }: NotificationTabProps) => {
  const [activeTab, setActiveTab] = useState(communities[0].communityId);
  const onClick = (communityId: number) => setActiveTab(communityId);
  return (
    <ul className="flex">
      <NotificationTabItem
        community={AllCommunity}
        isActive={activeTab === AllCommunity.communityId}
        onClick={onClick}
      />
      {communities.map(community => (
        <NotificationTabItem
          community={community}
          key={community.communityId}
          isActive={activeTab === community.communityId}
          onClick={onClick}
        />
      ))}
    </ul>
  );
};
