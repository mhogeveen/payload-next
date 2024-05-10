import { S3UploadCollectionConfig } from "payload-s3-upload";

const AWS_BUCKET = process.env.PAYLOAD_PUBLIC_AWS_BUCKET || "";
const AWS_CLOUDFRONT = process.env.PAYLOAD_PUBLIC_AWS_CLOUDFRONT_DOMAIN || "";

type DocSize = {
  filename: string;
  filesize: number;
  height: number;
  mimeType: string;
  url: string;
  width: number;
};

type Doc = {
  createdAt: string;
  filename: string;
  filesize: number;
  height: number;
  id: string;
  mimeType: string;
  sizes: Record<string, DocSize>;
  updatedAt: string;
  url: string;
  width: number;
};

const Media: S3UploadCollectionConfig = {
  slug: "media",
  upload: {
    staticURL: "/assets",
    staticDir: "assets",
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
    adminThumbnail: ({ doc }: { doc: Doc }) =>
      `${AWS_CLOUDFRONT}/images/${doc.sizes.thumbnail.filename}`,
  },
  // create a field to access uploaded files in s3 from payload api
  fields: [
    {
      name: "url",
      type: "text",
      access: {
        create: () => false,
      },
      admin: {
        disabled: true,
      },
      hooks: {
        afterRead: [
          (args) => {
            const doc = args.data as Doc;
            const sizeUrlMapping = Object.entries(doc.sizes).reduce(
              (acc, [label, sizeDoc]) => {
                acc[label] = `${AWS_CLOUDFRONT}/images/${sizeDoc.filename}`;
                return acc;
              },
              {
                original: `${AWS_CLOUDFRONT}/images/${doc.filename}`,
              }
            );
            return sizeUrlMapping;
            // return `${AWS_CLOUDFRONT}/images/${args.data.filename}`;
          },
        ],
      },
    },
  ],
};

export default Media;
