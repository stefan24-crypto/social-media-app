import React from "react";
import { useAppSelector } from "../../store/hooks";
import ProfileCirlcle from "../../UI/ProfileCirlcle";
import classes from "./HomeSection.module.css";

const HomeSection: React.FC = () => {
  const users = useAppSelector((state) => state.data.users);
  return (
    <section className={classes.home}>
      <header>
        <h1 className={classes.h1}>People</h1>
        <div className={classes.people}>
          {users.map((each) => (
            <ProfileCirlcle src={each.profile_pic} bgColor="#292929" />
          ))}
        </div>
      </header>
      <main></main>
    </section>
  );
};

export default HomeSection;
