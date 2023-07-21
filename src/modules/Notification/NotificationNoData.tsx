import Image from 'next/image';

export const NotificationNoData = () => {
  return (
    <div className="px-54pxr pt-125pxr">
      <div className="px-22pxr">
        <div className="relative h-[248px] w-full">
          <Image src="/assets/images/ufo.png" fill className="object-contain" alt="ufo" />
        </div>
      </div>

      <p className="mt-52pxr text-center text-b1 font-medium text-gray-400">
        아직 알람이 없어요.
        <br />
        다른 주민들에게 먼저 말을 건네보세요.
      </p>
    </div>
  );
};
