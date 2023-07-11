'use client';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '~/components/Button';

export const IdCardEditButton = () => {
  const pathname = usePathname();
  const router = useRouter();

  const onClickIdCardEditButton = () => {
    router.push(`${pathname}/edit`);
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
