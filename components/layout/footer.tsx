import React from "react";
import Link from "next/link";
import classes from "./footer.module.css";

// displays footer with copyright and link to Bill Stephens' portfolio page
const Footer: React.FC = () => {
  return (
    <div className={classes.footer}>
      <p className={classes.text}>Copyright © 2024, <Link className={classes.link} href="https://billstephens2022.github.io/my_portfolio/">Bill Stephens</Link>. All Rights Reserved.</p>
    </div>
  );
}

export default Footer;