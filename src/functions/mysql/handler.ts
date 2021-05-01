import "source-map-support/register";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

console.log(process.env.ENDPOINT);
console.log(process.env.USERNAME);

const mysql = require("serverless-mysql")({
  backoff: "decorrelated",
  base: 5,
  cap: 200,
});

mysql.config({
  host: "localhost",
  database: "slsdb",
  user: "root",
  password: "root",
});
// mysql.config({
//   host: process.env.ENDPOINT,
//   database: process.env.DATABASE,
//   user: process.env.USERNAME,
//   password: process.env.PASSWORD,
// });

const mysqlHandler = async (event) => {
  let results = await mysql.query("SELECT * FROM slsdb.CUSTOMERS");
  console.log(results);
  console.log(results);
  await mysql.end();
  return formatJSONResponse({
    message: `Hello ${results.name}!`,
  });
};

export const main = middyfy(mysqlHandler);
