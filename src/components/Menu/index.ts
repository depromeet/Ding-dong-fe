import { MenuElement } from '~/components/Menu/MenuElement';
import { MenuHeader } from '~/components/Menu/MenuHeader';
import { MenuWrapper } from '~/components/Menu/MenuWrapper';

export const Menu = Object.assign(MenuWrapper, {
  Header: MenuHeader,
  Element: MenuElement,
});
