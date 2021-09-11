module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts'],
  testPathIgnorePatterns: ['node_modules', 'build'],
  collectCoverageFrom: [
    '**/src/**/*.{ts,tsx,js,jsx}',
    '!**/node_modules/**',
    '!**/build/**',
  ],
};
