export { DesignSystemProvider } from './components/DesignSystemProvider';
export { AppShell, PageSection, SectionTitle } from './components/Primitives';
export { Eyebrow } from './components/Eyebrow';
export { BrandMark } from './components/BrandMark';
export { Alert, Card, Field } from './components/FormControls';
export { createAppTheme, type DesignSystemMode } from './theme';

// The stylesheet is imported explicitly by consumers through the package CSS entry.
// Allow CJS consumers to require the package (bundlers will use ESM by default)
// No runtime code needed; exports above are the public surface.
