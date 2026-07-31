import fs from 'fs';
import path from 'path';

describe('design-system package entry', () => {
  it('loads the shared stylesheet from the app layout', () => {
    const layoutPath = path.join(process.cwd(), 'apps', 'nx', 'app', 'layout.tsx');
    const layoutSource = fs.readFileSync(layoutPath, 'utf8');

    expect(layoutSource).toContain("import '@nx/design-system/styles.css';");
  });
});
