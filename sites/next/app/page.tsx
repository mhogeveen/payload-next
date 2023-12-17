import { RichText } from "../components/RichText";
import { Page } from "cms/generated/types";
import { notFound } from "next/navigation";
import { apiURL, authHeader } from "../config";

async function getPage() {
  try {
    const res = await fetch(`${apiURL}/api/pages/657db1d8e77e06c0c6a0726e`, {
      cache: "no-cache",
      headers: {
        "X-Auth-Token": authHeader,
      },
    });
    return res.json();
  } catch (e) {
    console.error(e);
  }
}

export default async function Home() {
  const data: Page = await getPage();

  if (!data.layout) notFound();

  return (
    <main>
      {data.layout.map((block) => {
        switch (block.blockType) {
          case "RichText":
            return <RichText key={block.id} {...block} />;
          default:
            return null;
        }
      })}
    </main>
  );
}
