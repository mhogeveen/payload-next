import { CollectionConfig } from "payload/types";
import { RichText } from "../blocks/RichText";
import { readAccessWithAuth } from "../access/collections";

const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    read: readAccessWithAuth,
  },
  auth: false,
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "layout",
      type: "blocks",
      blocks: [RichText],
    },
  ],
};

export default Pages;
