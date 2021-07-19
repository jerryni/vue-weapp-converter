module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/*.{js,ts}',
    '!src/utils/vue-html-parser.ts',
  ]
};
