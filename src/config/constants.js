const devConfig = {
  MONGO_URL: 'mongodb://localhost/boilderplate-dev',
  JWT_SECRET: 'Thisisthesecretkey'
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost/boilderplate-test',
  JWT_SECRET: 'Thisisthesecretkey'
};

const prodConfig = {
  MONGO_URL: 'mongodb://localhost/boilderplate-prod',
  JWT_SECRET: 'Thisisthesecretkey'
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