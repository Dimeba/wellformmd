// temps components
import Hero from "@/components/Hero";
import Button from "@/components/Button";
import SectionTitle from "@/components/SectionTitle";
import Cards from "@/components/Cards";
import Review from "@/components/Review";

// queries
import {
  getPageById,
  getSectionById,
  getTreatments,
  getBenefits,
} from "@/graphql/queries";

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
  const page = await getPageById("cG9zdDo2ODU=");
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
  const benefitsSection = sections[2].sectionFields;

  // Treatments
  const treatments = await getTreatments();
  // Benefits
  const benefits = await getBenefits();
  console.log("benefits", benefits);

  const heroLayout = "layout1";
  return (
    <main>
      <Hero
        title={heroSection.title}
        subtitle={heroSection.subtitle}
        heroLayout={heroLayout}
        text={heroSection.text}
        image={heroSection.image.node.link}
      />
      {/* treatments section */}
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

        {/* benefits section */}

        <div
          className="container"
          style={{
            margin: "0 auto",
            paddingTop: "7rem",
          }}
        >
          <SectionTitle
            title={benefitsSection.title}
            subtitle={benefitsSection.subtitle}
          />

          <Cards columns={4} content={benefits} />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "2rem",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "7rem",
            }}
          >
            <Button
              text="View Treatments"
              secondary={false}
              link="/treatment"
            />
            <Button text="Special Deals" secondary={true} link="/special" />
          </div>
        </div>
      </section>
      <Review />
    </main>
  );
}
