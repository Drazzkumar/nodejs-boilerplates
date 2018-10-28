const devConfig = {
  MONGO_URL: "mongodb://localhost/onpay-dev",
  JWT_SECRET: "Thisisthesecretkey"
};

const testConfig = {
  MONGO_URL: "mongodb://localhost/onpay-test",
  JWT_SECRET: "Thisisthesecretkey"
};

const prodConfig = {
  MONGO_URL: "mongodb://razz:onpay04@ds219832.mlab.com:19832/onpay",
  JWT_SECRET: "Thisisthesecretkey"
};

const defaultConfig = {
  PORT: process.env.PORT || 3456
};

function envConfig(env) {
  switch (env) {
    case "development":
      return devConfig;
    case "test":
      return testConfig;
    default:
      return prodConfig;
  }
}

export default { ...defaultConfig, ...envConfig(process.env.NODE_ENV) };
