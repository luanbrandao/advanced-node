module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/index.ts',
  ],
  coverageDirectory: 'coverage',
  collectCoverage: false,
  coverageProvider: 'babel',
  moduleNameMapper: {
    // config os @
    '@/tests/(.+)': '<rootDir>/tests/$1', // o mais generico primeiro
    '@/(.+)': '<rootDir>/src/$1',
  },
  testMatch: ['**/*.spec.ts'],
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  transform: {
    '\\.ts$': 'ts-jest',
  },
  clearMocks: true,
};
