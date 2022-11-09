import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

// creating new instance of s3
const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
});
export const upload = async (payload: string) => {
  try {
    const data = await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.BUCKET,
        Key: `${uuidv4()}`,
        Body: payload,
      })
    );
    console.log("uploaded");
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const getStream = async () => {
  const params = {
    Bucket: process.env.BUCKET,
    Key: "5139fb9b-833f-41ca-bf42-3f02e1e662ac",
  };
  try {
    const data = await s3Client.send(new GetObjectCommand(params));
    console.log("data fetched from s3 bucket");
    return data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { upload, getStream };
