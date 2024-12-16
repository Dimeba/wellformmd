import styles from "./Hamburger.module.scss";

interface HamburgerMenuProps {
  toggled: boolean;
  toggle: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ toggled, toggle }) => {
  return (
    <div className={styles.hamburgerWrapper} onClick={toggle}>
      <div className={`${styles.line} ${toggled ? styles.open : ""}`}></div>
      <div className={`${styles.line} ${toggled ? styles.open : ""}`}></div>
      <div className={`${styles.line} ${toggled ? styles.open : ""}`}></div>
    </div>
  );
};

export default HamburgerMenu;
