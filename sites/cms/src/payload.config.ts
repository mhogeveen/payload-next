import path from "path";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import Users from "./collections/Users";
import Pages from "./collections/Pages";

const PUBLIC_DOMAIN = process.env.PAYLOAD_PUBLIC_SERVER_URL;

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  cors: [PUBLIC_DOMAIN || "http://localhost:3000"],
  csrf: [PUBLIC_DOMAIN || "http://localhost:3000"],
  serverURL: PUBLIC_DOMAIN || "http://localhost:4000",
  editor: slateEditor({}),
  collections: [Users, Pages],
  typescript: {
    outputFile: path.resolve(__dirname, "../generated/types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "../generated/schema.graphql"),
  },
  plugins: [],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
});
