// import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";
// import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
// import Button from "@/components/buttons/button";
import classes from "@/components/Navbar.module.css";

const Navbar = () => {
//   const { data: session } = useSession();
  const [isChecked, setIsChecked] = useState(false);

  const router = useRouter();

  const handleLinkClick = () => {
    setIsChecked(false);
  };

//   const logoutHandler = () => {
//     signOut();
//   }

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
                href="/Accounting"
                className={`${classes.nav_item} ${classes.nav_link} ${
                  router.pathname === "/Accounting" ? classes.active : ""
                }`}
                onClick={handleLinkClick}
              >
                Accounting
              </Link>
            </li>
            <li className={classes.nav_item}>
              <Link
                href="/Fronting"
                className={`${classes.nav_item} ${classes.nav_link} ${
                  router.pathname === "/Fronting" ? classes.active : ""
                }`}
                onClick={handleLinkClick}
              >
                Fronting Risk
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </Fragment>
  );
}

export default Navbar;