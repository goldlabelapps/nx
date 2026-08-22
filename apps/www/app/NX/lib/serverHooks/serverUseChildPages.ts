import { getChildPagesFromNav, type ChildPageLink } from '../content';
import { serverUseNav } from './serverUseNav';

export async function serverUseChildPages(currentPath: string): Promise<ChildPageLink[]> {
  const navItems = await serverUseNav();
  return getChildPagesFromNav(navItems, currentPath, {
    includeChildren: true,
    includeRootChildrenWhenAtRoot: true,
  });
}

export type { ChildPageLink };
