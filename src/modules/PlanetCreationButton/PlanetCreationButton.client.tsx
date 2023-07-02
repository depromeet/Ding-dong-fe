'use client';
import { useRouter } from 'next/navigation';

import { PlusIcon } from '~/components/Icon';
import { tw } from '~/utils/tailwind.util';

export const PlanetCreationButton = () => {
  const router = useRouter();

  const onClickCreateButton = () => {
    router.push('/admin/community/create');
  };

  return (
    <div className="rounded-xl border border-grey-200 bg-grey-50">
      <button
        className="flex items-center gap-20pxr px-20pxr py-16pxr"
        type="button"
        onClick={onClickCreateButton}
      >
        <div className="flex h-[36px] w-[36px] items-center justify-center rounded-3xl bg-grey-100">
          <PlusIcon />
        </div>
        <p className={`${tw('text-b1 text-gray-900', 'font-semibold')}`}>행성 만들기</p>
      </button>
    </div>
  );
};
