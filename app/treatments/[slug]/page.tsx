import { getTreatments } from "@/graphql/queries";

function createSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");
}

export async function generateStaticParams() {
  const treatments = await getTreatments();

  return treatments.map(({ node }) => ({
    slug: createSlug(node.title),
  }));
}

export default function TreatmentsSlugPage() {
  return <main></main>;
}
