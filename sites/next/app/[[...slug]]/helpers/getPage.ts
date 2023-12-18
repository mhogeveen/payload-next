import { Page } from "cms/generated/types";
import { apiURL, authHeader } from "../../../config";
import { PAGE } from "cms/queries/pages";

type Pages = {
  data: {
    pages: Partial<{
      docs: Page[];
      hasNextPage: boolean;
      hasPrevPage: boolean;
      limit: number;
      nextPage: number;
      prevPage: number;
      offset: number;
      page: number;
      pagingCounter: number;
      totalDocs: number;
      totalPages: number;
    }>;
  };
};

export async function getPage(
  params: Record<string, string[]>,
): Promise<Page | undefined> {
  let page: Page | undefined;
  const slug = params.slug?.length ? params.slug.join("/") : "homepage";

  try {
    const res = await fetch(`${apiURL}/api/graphql`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "X-Auth-Token": authHeader,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      next: { tags: [`pages_${slug}`] },
      body: JSON.stringify({
        query: PAGE,
        variables: {
          slug: slug,
        },
      }),
    });
    const data: Pages = await res.json();
    page = data.data.pages.docs?.[0];
  } catch (e) {
    console.error(e);
  }

  return page;
}
