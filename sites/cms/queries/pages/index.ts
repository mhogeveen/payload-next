export const RICH_TEXT = `
  ... on RichText {
    content
    id
    blockName
    blockType
  }
`;

export const PAGE = `
  query Page($slug: String) {
    pages: Pages(where: { slug: { equals: $slug } }, limit: 1, draft: false) {
      docs {
        id
        title
        layout {
          ${RICH_TEXT}
        }
      }
    }
  }
`;
