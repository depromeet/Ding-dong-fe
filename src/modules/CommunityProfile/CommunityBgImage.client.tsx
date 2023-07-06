'use client';

import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

import { usePostCommunityUpdate } from '~/api/domain/community.api';
import { usePostImageUrl } from '~/api/domain/image.api';
import { Button } from '~/components/Button';
import { useToastMessageStore } from '~/stores/toastMessage.store';
import { CommunityDetailModel } from '~/types/community';

type CommunityBgImageProps = {
  coverImageUrl?: string;
  isEditable?: boolean;
  community: Omit<CommunityDetailModel, 'invitationCode'>;
};
export const CommunityBgImage = ({ isEditable, community }: CommunityBgImageProps) => {
  const { title, logoImageUrl, coverImageUrl, description, communityId } = community;
  const [profileImage, setProfileImage] = useState<string | undefined>(coverImageUrl);

  const { mutateAsync } = usePostImageUrl();
  const mutation = usePostCommunityUpdate(communityId);
  const { infoToast, errorToast } = useToastMessageStore();

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const imageFileList = e.target.files;
    if (imageFileList && imageFileList.length > 0) {
      const data = await mutateAsync(imageFileList[0]);
      if (data) {
        setProfileImage(data.imageUrl);
        mutation.mutate(
          { name: title, coverImageUrl: data.imageUrl, logoImageUrl, description },
          {
            onSuccess: () => infoToast('커버 이미지가 변경되었습니다.'),
            onError: () => errorToast('커버 이미지 변경에 실패했습니다. 다시 시도해 주세요.'),
          },
        );
      } else {
        errorToast('커버 이미지 변경에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };
  return (
    <div className="relative h-[174px] w-full">
      {isEditable && (
        <Button
          size="small"
          color="secondary"
          className="absolute bottom-20pxr right-20pxr z-10 w-fit px-12pxr py-8pxr"
        >
          <label htmlFor="file">커버 변경</label>
        </Button>
      )}

      <Image
        alt="planet cover image"
        src={profileImage ?? '/assets/images/planet-cover-default-image.png'}
        fill={true}
        className="object-cover"
      />

      <input
        className="hidden"
        onChange={onChange}
        type="file"
        accept="image/*"
        name="file"
        id="file"
      />
    </div>
  );
};
