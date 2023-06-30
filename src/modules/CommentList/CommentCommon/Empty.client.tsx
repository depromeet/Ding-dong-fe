import Image from 'next/image';

export const Empty = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-16pxr pt-18pxr">
      <Image src="/assets/images/congrats-clap.png" alt="congrats-clap" width={90} height={78} />
      <span className="text-b2 text-grey-400">가장 먼저 댓글을 남겨보세요</span>
    </div>
  );
};
