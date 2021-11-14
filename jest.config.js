module.exports = {
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    moduleNameMapper: {
      '\\.scss$': 'identity-obj-proxy',
      '^@components/(.*)$': '<rootDir>/src/view/$1',
    },
    collectCoverageFrom: ['<rootDir>/**/*.{ts, tsx}'],
    testEnvironment: "jsdom",
    moduleDirectories: ['node_modules', 'src'],
    roots: ['<rootDir>'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)$',
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
};