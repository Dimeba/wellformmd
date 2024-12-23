// styles
import styles from "./Button.module.scss";

// components
import Link from "next/link";

interface Props {
  text: string;
  secondary?: boolean;
  link: string;
}

const Button: React.FC<Props> = ({ text, secondary, link }) => {
  return (
    <Link
      href={link}
      className={!secondary ? styles.primary : styles.secondary}
      aria-label={`Link to ${text}`}
    >
      {text}
    </Link>
  );
};

export default Button;
