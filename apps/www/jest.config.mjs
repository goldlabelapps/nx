import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@nx/design-system$': '<rootDir>/../../packages/design-system/src/index.ts',
    '^@nx/design-system/(.*)$': '<rootDir>/../../packages/design-system/src/$1',
  },
};

export default createJestConfig(customJestConfig);
