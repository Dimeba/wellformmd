//queries
import { getSectionById } from "@/graphql/queries";

//styles
import styles from "./Location.module.scss";

//components
import Button from "./Button";

export default async function LocationSection() {
  const sectionId = "cG9zdDoyMTI5";
  const section = await getSectionById(sectionId);

  const locationSection = section.sectionFields;
  const locationImage = locationSection.image?.node?.link;

  return (
    <section className={`container ${styles.locationSection}`}>
      <div className={styles.contactBackground}>
        <div className={styles.contactDetails}>
          <div className={styles.content}>
            <h3>{locationSection.subtitle}</h3>
            <h2>{locationSection.title}</h2>
            <p>{locationSection.text}</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                alignItems: "left",
                justifyContent: "left",
              }}
            >
              <Button
                text="Book consultations "
                secondary={false}
                link="/book"
              />
              <Button text="Get directions" secondary={true} link="/location" />
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img src={locationImage} alt={"Contact Section Image"} />
          </div>
        </div>
      </div>
    </section>
  );
}
