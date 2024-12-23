import type { Metadata } from "next";

// components
import Hero from "@/components/Hero";

// queries
import { getPageById, getSectionById } from "@/graphql/queries";

// metadata
export const metadata: Metadata = {
  title: "Wellform MD - Treatements",
};

export default async function Treatments() {
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
        image={heroSection?.image?.node?.link || ""}
        leftAlign
      />
    </div>
  );
}
