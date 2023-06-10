'use client';

import Image from 'next/image';

type LoadingStepProps = {
  planetName: string;
};

export const LoadingStep = ({ planetName }: LoadingStepProps) => {
  return (
    <div>
      <h1 className="mb-[90px] px-20pxr text-h2 text-grey-900">{`${planetName}으로\n광속으로 이동중...`}</h1>
      <div className="w-full">
        <Image
          src={`/assets/images/planet-with-shadow.png`}
          alt="planet image"
          object-fit="contain"
          object-position="center"
          width={339}
          height={385}
        />
      </div>
    </div>
  );
};
