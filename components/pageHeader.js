import classes from "./pageHeader.module.css";

const PageHeader = ({ children }) => {
    return <div className={classes.accounting_header}>{children}</div>;
}

export default PageHeader;
