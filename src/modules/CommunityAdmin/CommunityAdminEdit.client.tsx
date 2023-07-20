'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { useGetCommunityDetail, usePostCommunityUpdate } from '~/api/domain/community.api';
import { TopNavigation } from '~/components/TopNavigation';
import { CommunityDetailModel, CreateCommunityRequest } from '~/types/community';

import { DuplicateState } from './CommunityAdmin.type';
import { CommunityAdminEditForm } from './CommunityAdminEditForm.client';

type CommunityAdminEditProps = Pick<CommunityDetailModel, 'communityId'>;

export const CommunityAdminEdit = ({ communityId }: CommunityAdminEditProps) => {
  const { data } = useGetCommunityDetail(communityId);

  const { coverImageUrl, title, logoImageUrl, description } = data!.communityDetailsDto;

  const [isDuplicatedCheck, setIsDuplicatedCheck] = useState<DuplicateState>('SUCCESS');

  const methods = useForm<CreateCommunityRequest>({
    defaultValues: {
      name: title,
      logoImageUrl,
      description,
      coverImageUrl,
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
      <main className="px-20pxr pt-24pxr">
        <FormProvider {...methods}>
          <CommunityAdminEditForm
            mutation={mutation}
            isDuplicatedCheck={isDuplicatedCheck}
            setIsDuplicatedCheck={setIsDuplicatedCheck}
            hasDescription={true}
          />
        </FormProvider>
      </main>
      <div className="h-[50px] bg-white" />
    </div>
  );
};
