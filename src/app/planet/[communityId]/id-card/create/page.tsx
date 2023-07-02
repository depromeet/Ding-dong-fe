import { IdCardCreationSteps } from '~/modules/IdCardCreation';

type IdCardCreationPageProps = {
  params: {
    communityId: string;
  };
};

const IdCardCreationPage = ({ params: { communityId } }: IdCardCreationPageProps) => {
  return <IdCardCreationSteps communityId={Number(communityId)} />;
};

export default IdCardCreationPage;
