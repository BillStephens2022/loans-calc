import classes from "@/components/PageHeader.module.css";

const PageHeader = ({ children }) => {
    return <h1 className={classes.accounting_header}>{children}</h1>;
}

export default PageHeader;