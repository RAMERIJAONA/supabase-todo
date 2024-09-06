module.exports = {
  testEnvironment: 'node',
  testTimeout: 30000,
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  collectCoverageFrom: [
    '**/*.ts',
    '!**/node_modules/**',
    '!**/build/**',
    '!**/dist/**',
    '!**/coverage/**',
    '!**/__test__/**',
    '!**/src/types/**',
    '!**/src/scripts/**',
    '!**/.history/**',
  ],
  setupFiles: ['dotenv/config'],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      statements: 30,
      branches: 5,
      functions: 10,
      lines: 30,
    },
  },
  coverageReporters: ['clover', 'json', 'lcov', 'text', 'text-summary'],
  projects: ['./__test__/index.test.ts'],
  testResultsProcessor: 'jest-sonar-reporter',
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.(t|j)s?$': '@swc/jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/dist/', '/coverage/'],
};
