'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { usePostCommunityCreate } from '~/api/domain/community.api';
import { Button } from '~/components/Button';
import { TopNavigation } from '~/components/TopNavigation';
import { CreateCommunityRequest } from '~/types/community';

import { DuplicateState } from './CommunityAdmin.type';
import { CommunityAdminEditForm } from './CommunityAdminEditForm.client';

export const CommunityAdminCreate = () => {
  const [isDuplicatedCheck, setIsDuplicatedCheck] = useState<DuplicateState>('DEFAULT');

  const methods = useForm<CreateCommunityRequest>({
    defaultValues: {
      name: '',
      logoImageUrl: '',
    },
  });

  const mutation = usePostCommunityCreate();
  return (
    <div>
      <TopNavigation>
        <TopNavigation.Left>
          <TopNavigation.BackButton backButtonType="cancel" backLink="/" />
        </TopNavigation.Left>
      </TopNavigation>
      <main className="px-20pxr pt-24pxr">
        <h2 className="text-h2">행성을 만들어보세요</h2>
        <p className="mb-6 mt-11pxr text-b2 font-normal text-gray-700">
          행성에서 나와 주민들이 서로를 알아갈 수 있어요.
          <br />
          주민들을 위해 행성이 어떤 공간인지 소개해 주세요.
        </p>
        <FormProvider {...methods}>
          <CommunityAdminEditForm
            mutation={mutation}
            isDuplicatedCheck={isDuplicatedCheck}
            setIsDuplicatedCheck={setIsDuplicatedCheck}
          />
        </FormProvider>
        <Button
          type="submit"
          form="community-admin-edit-form"
          color="primary"
          size="xLarge"
          className="mt-8"
          disabled={isDuplicatedCheck !== 'SUCCESS'}
        >
          행성 만들기
        </Button>
      </main>
      <div className="h-[50px] bg-white" />
    </div>
  );
};
