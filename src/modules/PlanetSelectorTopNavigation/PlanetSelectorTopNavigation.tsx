import { TopNavigation } from '~/components/TopNavigation';
import { PlanetSelector } from '~/modules/PlanetSelectorTopNavigation/PlanetSelector.client';

export const PlanetSelectorTopNavigation = () => {
  return (
    <div className="pt-t-nav">
      <TopNavigation>
        <TopNavigation.Left>
          <PlanetSelector />
        </TopNavigation.Left>
      </TopNavigation>
    </div>
  );
};

export default PlanetSelectorTopNavigation;
