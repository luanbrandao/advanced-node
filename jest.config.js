module.exports = {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  collectCoverage: false,
  coverageProvider: 'babel',
  moduleNameMapper: {
    // config os @
    '@/tests/(.+)': '<rootDir>/tests/$1', // o mais generico primeiro
    '@/(.+)': '<rootDir>/src/$1'
  },
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  transform: {
    '\\.ts$': 'ts-jest'
  }
}