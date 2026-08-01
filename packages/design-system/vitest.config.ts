import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    globals: false,
    css: true,
    coverage: {
      reporter: ['text', 'html'],
      include: ['src/components/**/*.{ts,tsx}', 'src/theme.ts'],
    },
  },
});