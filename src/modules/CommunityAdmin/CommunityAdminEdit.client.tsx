'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { usePostCommunityUpdate } from '~/api/domain/community.api';
import { TopNavigation } from '~/components/TopNavigation';
import { CommunityDetailModel } from '~/types/community';

import { DuplicateState } from './CommunityAdmin.type';
import { CommunityAdminEditForm } from './CommunityAdminEditForm.client';

type CommunityAdminEditProps = Omit<CommunityDetailModel, 'invitationCode'>;

export const CommunityAdminEdit = ({
  logoImageUrl,
  title,
  description,
  communityId,
}: CommunityAdminEditProps) => {
  const [isDuplicatedCheck, setIsDuplicatedCheck] = useState<DuplicateState>('DEFAULT');

  const methods = useForm<CommunityDetailModel>({
    defaultValues: {
      title,
      logoImageUrl,
      description,
    },
  });

  const mutation = usePostCommunityUpdate(communityId);

  return (
    <div>
      <TopNavigation>
        <TopNavigation.Left>
          <TopNavigation.BackButton backLink="" />
        </TopNavigation.Left>
        <TopNavigation.Title>
          <p className="text-h5">행성 꾸미기</p>
        </TopNavigation.Title>
        <TopNavigation.Right>
          <button
            type="submit"
            form="community-admin-edit-form"
            className={twMerge(
              'text-h5 font-bold',
              isDuplicatedCheck === 'SUCCESS' ? 'text-primary-500' : 'text-gray-400',
            )}
          >
            완료
          </button>
        </TopNavigation.Right>
      </TopNavigation>
      <div className="mt-24pxr px-20pxr">
        <FormProvider {...methods}>
          <CommunityAdminEditForm
            mutation={mutation}
            isDuplicatedCheck={isDuplicatedCheck}
            setIsDuplicatedCheck={setIsDuplicatedCheck}
            hasDescription={true}
          />
        </FormProvider>
      </div>
    </div>
  );
};
