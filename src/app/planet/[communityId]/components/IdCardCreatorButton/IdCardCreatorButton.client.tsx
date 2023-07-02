'use client';

import { useRouter } from 'next/navigation';

import { useCheckIdCards } from '~/api/domain/community.api';
import { ChevronRightIcon } from '~/components/Icon';

type IdCardCreatorButtonProps = {
  communityId: number;
};

export const IdCardCreatorButton = ({ communityId }: IdCardCreatorButtonProps) => {
  const { data: checkIdCard } = useCheckIdCards(communityId);
  const router = useRouter();

  const onClickCreateIdCardButton = () => {
    router.push(`/planet/${communityId}/id-card/create`);
  };

  return (
    <div className="-mt-28pxr px-[27px]">
      {checkIdCard?.userMakeIdCard || (
        <button
          className="mb-23pxr flex w-full flex-row items-center justify-between rounded-xl bg-grey-800  px-16pxr py-12pxr"
          onClick={onClickCreateIdCardButton}
        >
          <p className="text-b1 text-white">나만의 주민증을 만들어보세요.</p>
          <ChevronRightIcon className="fill-white" width={18} height={18} />
        </button>
      )}
    </div>
  );
};
