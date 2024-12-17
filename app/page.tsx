// temps components
import Hero from "@/components/Hero";
import Button from "@/components/Button";
import SectionTitle from "@/components/SectionTitle";
import Cards from "@/components/Cards";

// queries
import { getPageById, getSectionById, getTreatments } from "@/graphql/queries";

export const metadata = {
  title: "Wellform MD - Weight Loss & Wellness",
  description: "Weight Loss & Wellness",
  icons: {
    icon: "/favicon.svg",
  },
  keywords: ["health", "wellness", "Iowa", "nutrition", "coaching"],
};

export default async function Home() {
  // Getting the page
  const page = await getPageById("/");
  const sections = [];

  // Getting the sections
  if (page.pageFields.sections && page.pageFields.sections.edges) {
    for (const edge of page.pageFields.sections.edges) {
      const section = await getSectionById(edge.node.id);
      sections.push(section);
    }
  }

  // Sections
  const heroSection = sections[0].sectionFields;
  const treatmentsSection = sections[1].sectionFields;

  // Treatments
  const treatments = await getTreatments();

  const heroLayout = "layout1";
  return (
    <main>
      <Hero
        title={heroSection.title}
        subtitle={heroSection.subtitle}
        heroLayout={heroLayout}
      />

      <section>
        <div className="container">
          <SectionTitle
            title={treatmentsSection.title}
            subtitle={treatmentsSection.subtitle}
          />
          <p
            style={{
              textAlign: "center",
              textWrap: "balance",
              marginBottom: "4rem",
            }}
          >
            {treatmentsSection.text}
          </p>
          <Cards columns={4} content={treatments} />
        </div>
      </section>

      {/* <div className='container'>
				<Cards columns={3} slider />
			</div> */}
    </main>
  );
}
