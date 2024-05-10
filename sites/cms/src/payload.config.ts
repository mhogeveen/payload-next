import path from "path";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";
import { S3Client } from "@aws-sdk/client-s3";
import s3Upload from "payload-s3-upload";

import Users from "./collections/Users";
import Pages from "./collections/Pages";
import Media from "./collections/Media";

const PUBLIC_DOMAIN = process.env.PAYLOAD_PUBLIC_SERVER_URL;

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  collections: [Users, Pages, Media],
  cors: [PUBLIC_DOMAIN || "http://localhost:3000"],
  csrf: [PUBLIC_DOMAIN || "http://localhost:3000"],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  debug: process.env.NODE_ENV !== "production",
  editor: slateEditor({}),
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "../generated/schema.graphql"),
  },
  plugins: [
    s3Upload(
      new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_KEY,
          secretAccessKey: process.env.AWS_SECRET,
        },
      })
    ),
  ],
  serverURL: PUBLIC_DOMAIN || "http://localhost:4000",
  telemetry: false,
  typescript: {
    outputFile: path.resolve(__dirname, "../generated/types.ts"),
    declare: false,
  },
});
