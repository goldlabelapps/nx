import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    globals: false,
    css: true,
    coverage: {
      reporter: ['text', 'html'],
      include: ['src/components/**/*.{ts,tsx}', 'src/styles/theme.ts'],
    },
  },
});