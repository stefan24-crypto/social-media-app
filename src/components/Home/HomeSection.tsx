import React from "react";
import classes from "./HomeSection.module.css";

const HomeSection: React.FC = () => {
  return (
    <section className={classes.home}>
      <header>
        <h1 className={classes.h1}>Profiles</h1>
      </header>
      <main></main>
    </section>
  );
};

export default HomeSection;
