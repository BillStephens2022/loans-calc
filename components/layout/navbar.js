import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classes from "./navbar.module.css";

// Navbar component.  Displays as hamburger menu that expands to fill page for user to make selection

const Navbar = () => {

  const [isChecked, setIsChecked] = useState(false);

  const router = useRouter();

  const handleLinkClick = () => {
    setIsChecked(false);
  };

  return (
    <Fragment>
      <div className={classes.navbar}>
        <input
          type="checkbox"
          className={classes.nav_checkbox}
          id="navi-toggle"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <label htmlFor="navi-toggle" className={classes.nav_button}>
          <span className={classes.nav_icon}>&nbsp;</span>
        </label>
        <div className={classes.nav_background}></div>
        <nav className={classes.navbar_nav}>
          <ul className={classes.nav_items}>
          <li className={classes.nav_item}>
              <Link
                href="/"
                className={`${classes.nav_item} ${classes.nav_link} ${
                  router.pathname === "/" ? classes.active : ""
                }`}
                onClick={handleLinkClick}
              >
                Home
              </Link>
            </li>
            <li className={classes.nav_item}>
              <Link
                href="/learn"
                className={`${classes.nav_item} ${classes.nav_link} ${
                  router.pathname === "/learn" ? classes.active : ""
                }`}
                onClick={handleLinkClick}
              >
                Learn
              </Link>
              </li>
            <li className={classes.nav_item}>
              <Link
                href="/accounting"
                className={`${classes.nav_item} ${classes.nav_link} ${
                  router.pathname === "/accounting" ? classes.active : ""
                }`}
                onClick={handleLinkClick}
              >
                Accounting
              </Link>
            </li>
            <li className={classes.nav_item}>
              <Link
                href="/fronting"
                className={`${classes.nav_item} ${classes.nav_link} ${
                  router.pathname === "/fronting" ? classes.active : ""
                }`}
                onClick={handleLinkClick}
              >
                Fronting Risk
              </Link>
            </li>
            <li className={classes.nav_item}>
              <Link
                href="/quiz"
                className={`${classes.nav_item} ${classes.nav_link} ${
                  router.pathname === "/quiz" ? classes.active : ""
                }`}
                onClick={handleLinkClick}
              >
                Quiz
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </Fragment>
  );
}

export default Navbar;