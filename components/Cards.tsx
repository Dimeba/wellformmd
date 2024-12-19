"use client";

//components
import Button from "../components/Button";

// styles
import styles from "./Cards.module.scss";

// hooks
import { useState, useEffect } from "react";

// types
import {
  Treatment,
  Benefit,
  Testimonial,
  Article,
  TeamMember,
} from "@/types/contentTypes";

interface Props {
  slider?: true;
  columns: 3 | 4;
  content: Treatment[] | Benefit[] | Testimonial[] | Article[] | TeamMember[];
}

const Cards: React.FC<Props> = ({ slider, columns, content }) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  // Calculate window width on window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Scroll function
  const scroll = (forward: boolean): void => {
    const container = document.querySelector(`.${styles.slider}`);
    if (container) {
      const containerWidth = container.clientWidth;

      // Calculate gap between columns based on rem
      const gap =
        parseFloat(getComputedStyle(document.documentElement).fontSize) * 2;

      // Calculate column width based on window width
      let newColumnWidth: number;
      switch (true) {
        case windowWidth < 768:
          newColumnWidth = containerWidth;
          break;
        case windowWidth < 1024:
          newColumnWidth = (containerWidth - gap) / 2;
          break;
        default:
          newColumnWidth = (containerWidth - gap * (columns - 1)) / columns;
      }

      container.scrollBy({
        left: forward ? newColumnWidth : -newColumnWidth,
        behavior: "smooth",
      });
    }
  };

  const defaultStyles = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
  };

  const sliderStyles = {
    gridAutoColumns: `calc((100% - (2rem * (${columns - 1}))) / ${columns})`,
  };

  return (
    <div className={styles.cardsContainer}>
      {slider && <button onClick={() => scroll(false)}>Left</button>}
      {slider && <button onClick={() => scroll(true)}>Right</button>}
      <div
        className={`${slider ? styles.slider : styles.default}`}
        style={slider ? sliderStyles : defaultStyles}
      >
        {content.map((item) => {
          //treatment fields
          if ("treatmentFields" in item.node) {
            const treatmentImage = item.node.treatmentFields?.image?.node?.link;
            const treatmentTitle = item.node.title;
            const treatmentSubtitle = item.node.treatmentFields?.subtitle;

            return (
              <div key={item.node.id} className={styles.card}>
                {treatmentImage && (
                  <img
                    src={treatmentImage}
                    alt={treatmentTitle}
                    className={styles.cardImage}
                    width={330}
                    height={330}
                    style={{ objectFit: "cover" }}
                  />
                )}
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{treatmentTitle}</h3>
                  <p style={{ color: "#666666" }}>{treatmentSubtitle}</p>
                  <Button
                    text="View Treatment"
                    secondary={false}
                    link={`/treatment/${item.node.id}`}
                  />
                </div>
              </div>
            );
          }

          // benefit fie
          if ("benefitFields" in item.node) {
            const benefitImage = item.node.benefitFields.image.node.link;
            const benefitTitle = item.node.title;
            const benefitSubtitle = item.node.benefitFields?.subtitle;

            return (
              <div key={item.node.id} className={styles.card}>
                {benefitImage && (
                  <img
                    src={benefitImage}
                    alt={benefitTitle}
                    width={154}
                    height={154}
                    style={{
                      objectFit: "cover",
                      display: "block",
                      margin: "0 auto",
                    }}
                  />
                )}
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{benefitTitle}</h3>
                  <p style={{ color: "#666666" }}>{benefitSubtitle}</p>
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export default Cards;
