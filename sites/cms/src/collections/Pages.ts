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
      name: "slug",
      type: "text",
      required: true,
      validate: (value) => {
        const VALID_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
        const isValidSlug = VALID_SLUG_PATTERN.test(value);

        if (isValidSlug) {
          return true;
        }

        return "Value must be of shape 'my-new-page'";
      },
    },
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
