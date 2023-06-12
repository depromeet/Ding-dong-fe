import { TopNavigationBackButton } from './TopNavigationBackButton';
import { TopNavigationLeft } from './TopNavigationLeft';
import { TopNavigationRight } from './TopNavigationRight';
import { TopNavigationTitle } from './TopNavigationTitle';
import { TopNavigationWrapper } from './TopNavigationWrapper';

export const TopNavigation = Object.assign(TopNavigationWrapper, {
  Left: TopNavigationLeft,
  Title: TopNavigationTitle,
  Right: TopNavigationRight,
  BackButton: TopNavigationBackButton,
});
