import Image from 'next/image';

const Home = () => {
  return (
    <main>
      <Image
        src="/assets/images/splash.png"
        width={0}
        height={0}
        sizes="100vw"
        alt="splash"
        className="mt-none-t-nav max-h-[100vh] w-full object-cover"
      />
    </main>
  );
};

export default Home;
