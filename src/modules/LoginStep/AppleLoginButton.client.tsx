'use client';
import Image from 'next/image';

export const AppleLoginButton = () => {
  return (
    <div className="overflow-hidden rounded-[12px]">
      <button onClick={() => alert('아직 준비중이에요...😓')}>
        <Image
          src="/assets/images/apple_login_large_wide.png"
          alt="AppleButtonImage"
          width={400}
          height={200}
          priority
        />
      </button>
    </div>
  );
};
