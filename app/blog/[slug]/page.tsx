import { getArticles } from "@/graphql/queries";

function createSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");
}

export async function generateStaticParams() {
  const articles = await getArticles();

  return articles.map(({ node }) => ({
    slug: createSlug(node.title),
  }));
}

export default function BlogSlugPage() {
  return <main></main>;
}
