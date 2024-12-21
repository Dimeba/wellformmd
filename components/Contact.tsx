//queries
import { getSectionById } from "@/graphql/queries";

//styles
import styles from "./Contact.module.scss";

export default async function ContactSection() {
  const sectionId = "cG9zdDoyMTI4";
  const section = await getSectionById(sectionId);

  const contactSection = section.sectionFields;
  const contactImage = contactSection.image?.node?.link;

  return (
    <section className={styles.contactSection}>
      <div className={styles.contactBackground}>
        <div className={styles.contactDetails}>
          <div className={styles.content}>
            <h3>{contactSection.subtitle}</h3>
            <h2>{contactSection.title}</h2>
            <p>{contactSection.text}</p>
            <form>
              <input type="email" placeholder="Enter your e-mail" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
          <div className={styles.imageContainer}>
            <img src={contactImage} alt={"Contact Section Image"} />
          </div>
        </div>
      </div>
    </section>
  );
}
