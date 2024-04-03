import classes from "./pageHeader.module.css";

// Page Header to show at the top of each page to ensure consistency

const PageHeader = ({ children }) => {
    return <div className={classes.page_header}>{children}</div>;
}

export default PageHeader;
