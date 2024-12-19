import { getPageById, getSectionById } from "@/graphql/queries";
import Hero from "../../components/Hero";

export default async function TreatmentsSlugPage() {
  const page = await getPageById("cG9zdDoyMTE0");
  const sections = [];

  // Getting the sections
  if (page.pageFields.sections && page.pageFields.sections.edges) {
    for (const edge of page.pageFields.sections.edges) {
      const section = await getSectionById(edge.node.id);
      sections.push(section);
    }
  }

  const heroSection = sections[0]?.sectionFields;
  const heroLayout = "layout3";

  return (
    <div>
      <Hero
        subtitle={heroSection?.subtitle || ""}
        title={heroSection?.title || ""}
        heroLayout={heroLayout}
        image={heroSection?.image?.node?.link || ""}
      />
    </div>
  );
}
