import Link from "next/link";
import classes from "./footer.module.css";

const Footer = () => {
  return (
    <div className={classes.footer}>
      {/* <Link href="/admin"><div className={classes.login_icon}><GoPasskeyFill fill="white" size="16px" /></div></Link> */}
      <p className={classes.text}>Copyright © 2024, <Link className={classes.link} href="https://billstephens2022.github.io/my_portfolio/">Bill Stephens</Link>. All Rights Reserved.</p>
    </div>
  );
}

export default Footer;