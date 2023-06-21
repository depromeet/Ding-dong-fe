'use client';

import { useState } from 'react';

import { AlarmTabItem } from './AlarmTabItem.client';

// TODO: BE 스키마 정리 후 types로 이동
export type CommunityAlarm = {
  communityId: number;
  title: string;
  logoImageUrl?: string;
  hasNewAlarm: boolean;
};
type AlarmTabProps = {
  communities: CommunityAlarm[];
};

const AllCommunity: CommunityAlarm = {
  communityId: 0,
  title: '전체',
  hasNewAlarm: false,
};

export const AlarmTab = ({ communities }: AlarmTabProps) => {
  const [activeTab, setActiveTab] = useState(communities[0].communityId);
  const onClick = (communityId: number) => setActiveTab(communityId);
  return (
    <ul className="flex">
      <AlarmTabItem
        community={AllCommunity}
        isActive={activeTab === AllCommunity.communityId}
        onClick={onClick}
      />
      {communities.map(community => (
        <AlarmTabItem
          community={community}
          key={community.communityId}
          isActive={activeTab === community.communityId}
          onClick={onClick}
        />
      ))}
    </ul>
  );
};
