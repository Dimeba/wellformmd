// styles
import styles from "./Hero.module.scss";

import Button from "./Button";
import SectionTitle from "./SectionTitle";
import AnimatedDiv from "./AnimatedDiv";
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
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundColor: !image ? "#EFF9FA" : "",
      }}
    >
      <AnimatedDiv>
        <div className={`${styles.container} ${styles[heroLayout]}`}>
          <h1 className={styles.title}>{title}</h1>
          <h3 className={styles.subtitle}>{subtitle}</h3>
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
                <Button
                  text="Our treatments"
                  link="/book-now"
                  secondary={true}
                />
              </div>{" "}
            </>
          )}
        </div>
      </AnimatedDiv>
    </section>
  );
};

export default Hero;
