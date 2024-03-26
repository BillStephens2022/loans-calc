import classes from "./pageHeader.module.css";

const PageHeader = ({ children }) => {
    return <div className={classes.page_header}>{children}</div>;
}

export default PageHeader;
