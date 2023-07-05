import { LoginStep } from '~/modules/LoginStep';

const SignInPage = () => {
  return (
    <main className="flex h-[calc(100vh-60px)] items-center px-layout-sm pb-10pxr">
      <LoginStep />
    </main>
  );
};

export default SignInPage;
