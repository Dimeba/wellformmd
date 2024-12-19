import { getPageById, getSectionById } from "@/graphql/queries";
import Hero from "../../components/Hero";

export default async function SpecialsSlugPage() {
  const page = await getPageById("cG9zdDoxNTM4");
  const sections = [];

  // Getting the sections
  if (page.pageFields.sections && page.pageFields.sections.edges) {
    for (const edge of page.pageFields.sections.edges) {
      const section = await getSectionById(edge.node.id);
      sections.push(section);
    }
  }

  const heroSection = sections[0]?.sectionFields;
  const heroLayout = "layout2";

  return (
    <div>
      <Hero
        subtitle={heroSection?.subtitle || ""}
        title={heroSection?.title || ""}
        heroLayout={heroLayout}
      />
    </div>
  );
}
