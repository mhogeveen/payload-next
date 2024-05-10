import { S3UploadCollectionConfig } from "payload-s3-upload";
import { readAccessWithAuth } from "../access/collections";

const AWS_BUCKET = process.env.PAYLOAD_PUBLIC_AWS_BUCKET || "";
const AWS_CLOUDFRONT = process.env.PAYLOAD_PUBLIC_AWS_CLOUDFRONT_DOMAIN || "";

const Media: S3UploadCollectionConfig = {
  slug: "media",
  access: {
    read: readAccessWithAuth,
  },
  upload: {
    mimeTypes: ["image/*"],
    disableLocalStorage: true,
    s3: {
      bucket: AWS_BUCKET,
      prefix: "images", // files will be stored in bucket folder `images`
    },
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        crop: "center",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        crop: "center",
      },
      {
        name: "tablet",
        width: 1024,
        height: null,
        crop: "center",
      },
    ],
    adminThumbnail: "thumbnail",
  },
  fields: [
    {
      name: "url",
      type: "text",
      access: {
        create: () => false,
      },
      admin: {
        hidden: true,
      },
      hooks: {
        afterRead: [
          (args) => {
            args.data.url = `${AWS_CLOUDFRONT}/images/${args.data.filename}`;

            Object.keys(args.data.sizes).forEach(
              (size) =>
                (args.data.sizes[
                  size
                ].url = `${AWS_CLOUDFRONT}/images/${args.data.sizes[size].filename}`)
            );
          },
        ],
      },
    },
  ],
};

export default Media;
