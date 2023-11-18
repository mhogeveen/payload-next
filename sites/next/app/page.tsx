import { RichText } from "./RichText";

async function getData() {
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
  const data = await getData();
  return (
    <main>
      <RichText content={data.content} />
    </main>
  );
}
