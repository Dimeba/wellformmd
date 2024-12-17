"use client";

//styles
import styles from "./Header.module.scss";

//hooks
import { useState, useEffect } from "react";

//navigation
import { usePathname } from "next/navigation";

//icons, images, link
import Link from "next/link";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa"; // Import Chevron Down from react-icons

//components
import Button from "./Button";
import HamburgerMenu from "./Hamburger";

interface MenuItem {
  title: string;
  href: string;
  submenuTitle?: string;
  submenu?: { title: string; href: string }[];
}

const menuItems: MenuItem[] = [
  {
    title: "Treatments",
    href: "#treatments",
    submenuTitle: "Treatments",
    submenu: [
      { title: "Waist Buster", href: "/waist-buster" },
      { title: "Mommy Makeover", href: "/mommy-makeover" },
      {
        title: "UltraSlim® Fat & Weight Loss",
        href: "/ultraslim-weight-loss",
      },
      { title: "UltraSmooth® Cellulite", href: "/ultrasmooth-cellulite" },
    ],
  },
  { title: "Specials", href: "#specials" },
  { title: "Gallery", href: "#gallery" },
  { title: "About Us", href: "#aboutUs" },
  { title: "Blog", href: "#blog" },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false); //state for scrolled header
  const [activeSubmenu, setActiveSubmenu] = useState<number | false>(false); //state for submenu
  const pathname = usePathname();
  const isHomepage = pathname == "/";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  //changing ui for header on scroll
  const handleScroll = (): void => {
    setIsScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const toggleSubmenu = (index: number): void => {
    setActiveSubmenu(activeSubmenu == index ? false : index);
  };

  return (
    <header
      className={`${styles.header} ${
        isScrolled || !isHomepage ? styles.scrolled : ""
      }`}
    >
      <p className={styles.welcomeMessage}>
        <i className="fa-solid fa-phone-volume" />
        (515) 446-8304
      </p>
      <div className={`container ${styles.headerContainer}`}>
        <a href="/" className={styles.logoWrapper}>
          <img
            src="/logo.svg"
            width={200}
            height={60}
            alt="Weight loss and wellness"
            className={styles.logo}
          />
        </a>
        <nav className={`${styles.navigation} ${isOpen ? styles.open : ""}`}>
          <ul className={styles.menuList}>
            {menuItems.map((item, index) => (
              <li key={index} className={styles.menuItemContainer}>
                <Link
                  href={item.href}
                  className={styles.menuItem}
                  onClick={() =>
                    item.submenu
                      ? toggleSubmenu(index)
                      : setActiveSubmenu(false)
                  }
                >
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    {item.title}
                    {item.title === "Treatments" && (
                      <FaChevronDown
                        style={{
                          marginLeft: "0.2rem",
                        }}
                      />
                    )}
                  </div>
                </Link>
                {item.submenu && (
                  <div
                    className={`container ${styles.dropdown} ${
                      activeSubmenu == index ? styles.open : ""
                    }`}
                  >
                    <div className={`container ${styles.dropdownContainer}`}>
                      {item.submenuTitle && (
                        <div className={styles.submenuTitle}>
                          <h3>{item.submenuTitle}</h3>
                          <div className={styles.dropdownContent}>
                            {item.submenu.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                href={subItem.href}
                                className={styles.dropdownLink}
                                onClick={() => setActiveSubmenu(false)}
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className={styles.dropdownImageWrapper}>
                        <Image
                          src="/dropdown.jpg"
                          alt="submenu example img"
                          width={600}
                          height={400}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}{" "}
          </ul>
          <Button text="Book Consultation" link="/book-now" secondary={false} />
        </nav>{" "}
        <HamburgerMenu toggled={isOpen} toggle={toggleMenu} />
      </div>
    </header>
  );
};

export default Header;
