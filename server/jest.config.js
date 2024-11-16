export default {
    testEnvironment: 'node',
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest',
    },
    // extensionsToTreatAsEsm: ['.js'],
    globals: {
      'babel-jest': {
        useESM: true,
      },
    },
  };
  