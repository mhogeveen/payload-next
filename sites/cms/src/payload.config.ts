import path from "path";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import Users from "./collections/Users";
import Pages from "./collections/Pages";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  cors: ["http://localhost:3000"],
  csrf: ["http://localhost:3000"],
  serverURL: "http://localhost:4000",
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
