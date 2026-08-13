import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildNavTreeFromFlatItems,
  getChildPagesFromNav,
  getFooterColumnsFromChildPages,
  type ContentNavItem,
} from '../src/index';

test('getChildPagesFromNav returns visible children for current path', () => {
  const nav: ContentNavItem[] = [
    {
      title: 'Features',
      path: '/features',
      children: [
        { title: 'Design System', path: '/features/design-system' },
        { title: 'Hidden Page', path: '/features/hidden', hideInNav: true },
      ],
    },
  ];

  const childPages = getChildPagesFromNav(nav, '/features');

  assert.equal(childPages.length, 1);
  assert.equal(childPages[0]?.title, 'Design System');
  assert.equal(childPages[0]?.path, '/features/design-system');
});

test('getFooterColumnsFromChildPages builds columns and applies limits', () => {
  const columns = getFooterColumnsFromChildPages(
    [
      {
        title: 'About',
        path: '/about',
        children: [
          { title: 'GitHub', path: 'https://github.com/goldlabelapps/nx' },
          { title: 'Ignored child', path: '/ignored-child' },
        ],
      },
      {
        title: 'NextJS',
        path: '/nextjs',
      },
    ],
    { maxColumns: 1, maxChildrenPerColumn: 1 },
  );

  assert.equal(columns.length, 1);
  assert.equal(columns[0]?.title, 'About');
  assert.equal(columns[0]?.href, '/about');
  assert.equal(columns[0]?.children?.length, 1);
  assert.equal(columns[0]?.children?.[0]?.title, 'GitHub');
});

test('buildNavTreeFromFlatItems creates nested structure ordered by order then title', () => {
  const tree = buildNavTreeFromFlatItems([
    { title: 'Zeta', path: '/zeta', order: 3 },
    { title: 'Home', path: '/' },
    { title: 'Features', path: '/features', order: 2 },
    { title: 'Design System', path: '/features/design-system', order: 1 },
    { title: 'Alpha', path: '/alpha', order: 1 },
  ]);

  assert.deepEqual(
    tree.map((item) => item.title),
    ['Alpha', 'Features', 'Zeta', 'Home'],
  );
  assert.equal(tree[1]?.children?.[0]?.title, 'Design System');
});
