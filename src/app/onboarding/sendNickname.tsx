import Image from 'next/image';

const SendNickname = () => {
  return (
    <div className="h-screen w-full px-6 py-16" style={{ background: '#212D2E' }}>
      <p className="bg-[##212D2E] text-lg font-semibold">
        반가워요! <br /> 앞으로 당신을 뭐라고 불러드릴까요?
      </p>
      <div className="mt-48">
        <div
          className="absolute rounded-full"
          style={{
            width: '342px',
            height: '342px',
            opacity: 0.5,
            mixBlendMode: 'multiply',
            background:
              'radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.29) 0%, #A5D4FF 100%)',
          }}
        ></div>
        <Image src="/assets/images/planet.png" alt="planet" width={400} height={400} />
      </div>
    </div>
  );
};

export default SendNickname;
