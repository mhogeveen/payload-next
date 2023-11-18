import { CollectionConfig } from "payload/types";

const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    read: () => true,
  },
  auth: false,
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      required: false,
    },
  ],
};

export default Pages;
