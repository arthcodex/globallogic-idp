/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: [
    "./node_modules/jest-enzyme/lib/index.js",
    "./setupTests.js"
  ]
};
