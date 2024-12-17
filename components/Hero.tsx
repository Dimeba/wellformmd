// styles
import styles from "./Hero.module.scss";

import Button from "./Button";

interface Props {
  heroLayout: "layout1" | "layout2" | "layout3";
  title: string;
  subtitle: string;
  h3?: string;
  text?: string;
  image?: string;
}

const Hero: React.FC<Props> = ({
  title,
  heroLayout,
  subtitle,
  text,
  image,
}) => {
  return (
    <section
      className={styles.hero}
      style={{
        backgroundImage: image ? `url(${image})` : "none",
        backgroundColor: !image ? "#EFF9FA" : "",
      }}
    >
      <div className={`${styles.container} ${styles[heroLayout]}`}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.subtitle}>{subtitle}</h2>
        {/*  <h3 className={styles.title}>{h3}</h3> */}
        <p className={styles.text}>{text}</p>
        {heroLayout == "layout1" && (
          <>
            <div className={styles.buttonWrapper}>
              <Button
                text="Book a FREE Consultation"
                link="/book-now"
                secondary={false}
              />
              <Button text="Our treatments" link="/book-now" secondary={true} />
            </div>{" "}
          </>
        )}
      </div>
      {image && (
        <div className={styles.imageContainer}>
          <img src={image} alt="Hero Image" className={styles.image} />
        </div>
      )}
    </section>
  );
};

export default Hero;
