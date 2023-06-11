import 'server-only';

import { CommunityIdCards } from '@/modules/CommnuityIdCards';

const page = () => {
  return (
    <div>
      <h3 className="mb-16pxr text-h3 text-grey-800">{'우리 행성 주민을 소개할게요!'}</h3>
      <CommunityIdCards />
    </div>
  );
};

export default page;
