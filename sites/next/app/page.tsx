import { RichText } from "./RichText";
import { Page } from "../../cms/generated/types";
import { notFound } from "next/navigation";

async function getPage() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/pages/6558b70fcf407d582deb5aa6`,
      {
        cache: "no-cache",
      }
    );
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
            return <RichText {...block} />;
          default:
            return null;
        }
      })}
    </main>
  );
}
