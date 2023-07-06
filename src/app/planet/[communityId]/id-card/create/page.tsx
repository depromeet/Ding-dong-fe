import { IdCardCreationSteps } from '~/modules/IdCardCreation';

type IdCardCreationPageProps = {
  params: {
    communityId: string;
  };
};

const IdCardCreationPage = ({ params: { communityId } }: IdCardCreationPageProps) => {
  return (
    <main>
      <IdCardCreationSteps communityId={Number(communityId)} />
    </main>
  );
};

export default IdCardCreationPage;
