const devConfig = {
  MONGO_URL: 'mongodb://localhost/boilderplate-dev',
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost/boilderplate-test',
};

const prodConfig = {
  MONGO_URL: 'mongodb://localhost/boilderplate-prod',
};


const defaultConfig = {
  PORT: process.env.PORT || 3000,
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default { ...defaultConfig, ...envConfig(process.env.NODE_ENV) };