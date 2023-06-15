'use client';

import Image from 'next/image';

type LoadingStepProps = {
  planetName: string;
};

export const LoadingStep = ({ planetName }: LoadingStepProps) => {
  return (
    <div className="mt-24pxr">
      <h1 className="mb-90pxr text-h2 text-grey-900">{`${planetName}으로\n광속으로 이동중...`}</h1>
      <Image
        src="/assets/images/planet-with-shadow.png"
        alt="planet image"
        object-fit="contain"
        object-position="center"
        className="mx-auto my-0"
        width={339}
        height={385}
      />
    </div>
  );
};
