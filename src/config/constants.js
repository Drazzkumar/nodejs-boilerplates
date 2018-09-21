const devConfig = {
  MONGO_URL: "mongodb://localhost/onpay-dev",
  JWT_SECRET: "Thisisthesecretkey",
  STRIPE_PUBLISHABLE_KEY: "pk_test_z34mJEdLgXQ7VUc51TggIrYQ",
  STRIPE_SECRET_KEY: "sk_test_YuNQTGQe4MT507sHK3yV1Gvm",
  cookieKey: "thisisthecookeikey"
};

const testConfig = {
  MONGO_URL: "mongodb://localhost/onpay-test",
  JWT_SECRET: "Thisisthesecretkey",
  STRIPE_PUBLISHABLE_KEY: "pk_test_z34mJEdLgXQ7VUc51TggIrYQ",
  STRIPE_SECRET_KEY: "sk_test_YuNQTGQe4MT507sHK3yV1Gvm",
  cookieKey: "thisisthecookeikey"
};

const prodConfig = {
  MONGO_URL: "mongodb://localhost/onpay",
  JWT_SECRET: "Thisisthesecretkey",
  STRIPE_PUBLISHABLE_KEY: "pk_test_z34mJEdLgXQ7VUc51TggIrYQ",
  STRIPE_SECRET_KEY: "sk_test_YuNQTGQe4MT507sHK3yV1Gvm",
  cookieKey: "thisisthecookeikey"
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
