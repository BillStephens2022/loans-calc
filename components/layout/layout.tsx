import React, { Fragment } from "react";
import Navbar from "./navbar";
import Footer from "./footer";

interface LayoutProps {
  children?: React.ReactNode;
}
// Layout to show Navbar and Footer component on each page
const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <Fragment>
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
