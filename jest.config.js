/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '(?!.*\.scss)^@/(.*)$': '<rootDir>/src/$1',
    '(?!.*\.scss)^@components/(.*)$': '<rootDir>/src/components/$1',
    '(?!.*\.scss)^@pages/(.*)$': '<rootDir>/src/pages/$1',
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.ts',
    '^.*\\.svg\\?react$': '<rootDir>/__mocks__/svgrMock.ts',
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
  },
};

export default config;

