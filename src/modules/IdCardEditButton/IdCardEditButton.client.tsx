'use client';
import { useRouter } from 'next/navigation';

import Button from '~/components/Button/Button';

export const IdCardEditButton = () => {
  const router = useRouter();

  const onClickIdCardEditButton = () => {
    router.push('/my-page/edit');
  };

  return (
    <Button
      size="small"
      color="secondary"
      className="w-fit px-8pxr py-12pxr"
      onClick={onClickIdCardEditButton}
    >
      수정
    </Button>
  );
};
