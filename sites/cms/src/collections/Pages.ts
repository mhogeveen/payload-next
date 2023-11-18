import { CollectionConfig } from "payload/types";
import { RichText } from "../blocks/RichText";

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
    },
    {
      name: "layout",
      type: "blocks",
      minRows: 0,
      maxRows: 20,
      blocks: [RichText],
    },
  ],
};

export default Pages;
