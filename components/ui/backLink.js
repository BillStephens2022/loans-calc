import Link from "next/link";
import { ImArrowLeft } from "react-icons/im";
import classes from "./backLink.module.css";

// Instructional link for user to link pack to previos page

const BackLink = ({ page, text }) => {
    return (
        <Link className={classes.link} href={`/${page}`}><p><ImArrowLeft />&nbsp;&nbsp;<span className={classes.backLinkText}>Back to {text}</span></p></Link>
    );
}

export default BackLink;