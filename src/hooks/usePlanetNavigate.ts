export const usePlanetNavigate = () => {
  const extractPlanetIdFromPathname = (currentPathname: string) => {
    const parts = currentPathname.split('/');
    const planetIdIndex = parts.findIndex(part => part === 'planet' || part === 'my-page');

    const notFoundPlanetID = planetIdIndex === -1;
    const planetIdIndexOverPathLength = planetIdIndex + 1 >= parts.length;

    if (notFoundPlanetID) return null;
    if (planetIdIndexOverPathLength) return null;

    return Number(parts[planetIdIndex + 1]);
  };
  return {
    extractPlanetIdFromPathname,
  };
};
