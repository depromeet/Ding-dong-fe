import { IdCardCreationSteps } from '~/modules/IdCardCreation';

type IdCardCreationPageProps = {
  params: {
    communityId: string;
  };
};

const IdCardCreationPage = ({ params: { communityId } }: IdCardCreationPageProps) => {
  return (
    <>
      <main>
        <IdCardCreationSteps communityId={Number(communityId)} />
      </main>
      <div className="h-[50px] bg-white" />
    </>
  );
};

export default IdCardCreationPage;
