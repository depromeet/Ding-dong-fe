'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import { TopNavigation } from '~/components/TopNavigation';
import { CommunityDetailModel } from '~/types/community';

import { CommunityAdminEditForm } from './CommunityAdminEditForm.client';

export const CommunityAdminEdit = ({ logoImageUrl, title, description }: CommunityDetailModel) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isChecked, setIsChecked] = useState(false);

  const methods = useForm<CommunityDetailModel>({
    defaultValues: {
      title,
      logoImageUrl,
      description,
    },
  });

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
              isChecked ? 'text-primary-500' : 'text-gray-400',
            )}
          >
            완료
          </button>
        </TopNavigation.Right>
      </TopNavigation>
      <div className="mt-24pxr px-20pxr">
        <FormProvider {...methods}>
          <CommunityAdminEditForm />
        </FormProvider>
      </div>
    </div>
  );
};
