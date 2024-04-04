import React from "react";
import classes from "./pageHeader.module.css";

// Page Header to show at the top of each page to ensure consistency
interface PageHeaderProps {
  children?: React.ReactNode;
}
const PageHeader: React.FC<PageHeaderProps> = ({ children }) => {
  return <div className={classes.page_header}>{children}</div>;
};

export default PageHeader;
