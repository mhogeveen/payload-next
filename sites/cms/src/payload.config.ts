import path from "path";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";
import dotenv from "dotenv";

import Users from "./collections/Users";
import Pages from "./collections/Pages";

dotenv.config();

const PUBLIC_DOMAIN = process.env.PUBLIC_DOMAIN;
const isProd = () => process.env.NODE_ENV === "production";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  cors: ["http://localhost:3000", PUBLIC_DOMAIN],
  csrf: ["http://localhost:3000", PUBLIC_DOMAIN],
  serverURL: isProd() ? PUBLIC_DOMAIN : "http://localhost:4000",
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
