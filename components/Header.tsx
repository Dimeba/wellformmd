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

//components
import Button from "./Button";

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
        title: "Ultraslim Fat and Weight Loss",
        href: "/ultraslim-weight-loss",
      },
      { title: "Ultrasmooth Cellulite", href: "/ultrasmooth-cellulite" },
    ],
  },
  { title: "Specials", href: "#specials" },
  { title: "Gallery", href: "#gallery" },
  { title: "About Us", href: "#aboutUs" },
  { title: "Blog", href: "#blog" },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false); //state for scrolled header
  const [activeSubmenu, setActiveSubmenu] = useState<number | false>(false); //state for submenu
  const pathname = usePathname();
  const isHomepage = pathname == "/";

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
      <p className={styles.welcomeMessage}>(515)446-8304</p>
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
        <nav className={styles.navigation}>
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
                  {item.title}
                </Link>
                {item.submenu && (
                  <div
                    className={`container ${styles.dropdown} ${
                      activeSubmenu == index ? styles.open : ""
                    }`}
                  >
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
                        width={400}
                        height={300}
                      />
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <Button text="Book Consultation" link="/book-now" secondary={false} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
