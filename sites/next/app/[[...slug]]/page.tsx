import { RichText } from "../../components/RichText";
import { notFound } from "next/navigation";
import { getPage } from "./helpers/getPage";

type PageProps = {
  params: Record<string, string[]>;
  searchParams: Record<string, string>;
};

export default async function HomePage({ params }: PageProps) {
  const page = await getPage(params);

  if (!page) notFound();

  return (
    <main>
      {page?.layout?.map((block) => {
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
