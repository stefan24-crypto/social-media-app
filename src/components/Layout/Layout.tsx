import React from "react";
import classes from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Top from "../Navbar/Top";

const Layout: React.FC = ({ children }) => {
  return (
    <section className={classes.app}>
      <Navbar />
      <main className={classes.main}>
        <Top />
        {children}
      </main>
    </section>
  );
};

export default Layout;
