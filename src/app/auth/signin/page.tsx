import { LoginStep } from '~/modules/LoginStep';

const SignInPage = () => {
  return (
    <main className="flex h-[calc(100vh-50px)] items-center px-layout-sm">
      <LoginStep />
    </main>
  );
};

export default SignInPage;
