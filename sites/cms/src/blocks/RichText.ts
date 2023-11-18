import { Block } from "payload/types";

export const RichText: Block = {
  slug: "RichText",
  // imageURL: 'https://google.com/path/to/image.jpg',
  // imageAltText: 'A nice thumbnail image to show what this block looks like',
  interfaceName: "RichText",
  fields: [
    {
      name: "content",
      type: "richText",
    },
  ],
};
