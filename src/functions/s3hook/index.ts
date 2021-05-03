import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: {
    OUTPUT_BUCKET: "${self:custom.outputBucket}",
  },
  events: [
    {
      s3: "${self:custom.inputBucket}",
    },
  ],
};
