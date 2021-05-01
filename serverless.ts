import type { AWS } from "@serverless/typescript";

import hello from "@functions/hello";
import mysql from "@functions/mysql";

const serverlessConfiguration: AWS = {
  service: "sls-nodejs-typescript-experiment",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "ap-northeast-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: { hello, mysql },
};

module.exports = serverlessConfiguration;
