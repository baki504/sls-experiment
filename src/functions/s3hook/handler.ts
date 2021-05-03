import { middyfy } from "@libs/lambda";
import "source-map-support/register";
import { S3 } from "aws-sdk";

const outputBucket = process.env.OUTPUT_BUCKET;
const s3 = new S3();

const s3hook = (event, context) => {
  console.log(
    `file saved to sls-input-bucket: ${event.Records[0].s3.object.key}`
  );
  // Fail on mising data
  if (!outputBucket) {
    context.fail("Error: Environment variable OUTPUT_BUCKET missing");
    return;
  }
  if (event.Records === null) {
    context.fail("Error: Event has no records.");
    return;
  }

  let tasks = [];
  for (let i = 0; i < event.Records.length; i++) {
    tasks.push(replicatePromise(event.Records[i], outputBucket));
  }

  Promise.all(tasks)
    .then(() => {
      context.succeed();
    })
    .catch(() => {
      context.fail();
    });
};

function replicatePromise(record, destBucket) {
  return new Promise((resolve, reject) => {
    // The source bucket and source key are part of the event data
    var srcBucket = record.s3.bucket.name;
    var srcKey = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));

    // Modify destKey if an alternate copy location is preferred
    var destKey = srcKey;
    var msg =
      "copying " +
      srcBucket +
      ":" +
      srcKey +
      " to " +
      destBucket +
      ":" +
      destKey;

    console.log("Attempting: " + msg);
    s3.copyObject(
      {
        Bucket: destBucket,
        Key: destKey,
        CopySource: encodeURIComponent(srcBucket + "/" + srcKey),
        MetadataDirective: "COPY",
      },
      (err, data) => {
        if (err) {
          console.log("Error:" + msg);
          console.log(err, err.stack); // an error occurred
          return reject("Error:" + msg);
        } else {
          console.log("Success: " + msg);
          return resolve("Success: " + msg);
        }
      }
    );
  });
}

export const main = middyfy(s3hook);
