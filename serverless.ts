import hello from "@functions/hello";
import mysql from "@functions/mysql";
import s3hook from "@functions/s3hook";
import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "sls-experiment",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
    inputBucket: "sls-input-bucket",
    outputBucket: "sls-output-bucket",
  },
  plugins: ["serverless-webpack", "serverless-offline", "serverless-s3-local"],
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
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["s3:GetObject", "s3:GetObjectAcl"],
        Resource: "arn:aws:s3:::${self:custom.inputBucket}/*",
      },
      {
        Effect: "Allow",
        Action: ["s3:PutObject", "s3:PutObjectAcl"],
        Resource: "arn:aws:s3:::${self:custom.outputBucket}/*",
      },
    ],
  },
  resources: {
    Resources: {
      S3BucketOutputs: {
        Type: "AWS::S3::Bucket",
        Properties: {
          BucketName: "${self:custom.outputBucket}",
        },
      },
    },
  },
  // import the function via paths
  functions: { hello, mysql, s3hook },
};

module.exports = serverlessConfiguration;
