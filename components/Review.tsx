// styles
import styles from "./Review.module.scss";

const Review: React.FC = () => {
  const reviewImages = [
    { src: "/review1.png", alt: "Yelp" },
    { src: "/review2.png", alt: "Facebook" },
    { src: "/review3.png", alt: "Google" },
    { src: "/review4.png", alt: "Trustpilot" },
  ];

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.imageGrid}>
        {reviewImages.map((image, index) => (
          <div key={index} className={styles.imagePlaceholder}>
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
