import React from "react";
import ProfileCirlcle from "../../UI/ProfileCirlcle";
import classes from "./ProfileSection.module.css";

const ProfileSection: React.FC = () => {
  return (
    <section className={classes.section}>
      <header className={classes.header}>
        <ProfileCirlcle src="https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f4ebe0c87612dab4f12a597%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D292%26cropX2%3D3684%26cropY1%3D592%26cropY2%3D3987" />
        <div>
          <h1>Bill Gates</h1>
        </div>
      </header>
      <main className={classes.main}>
        <div className={classes.stat}>
          <p>105</p>
          <span>Posts</span>
        </div>
        <div className={classes.vertical}></div>
        <div className={classes.stat}>
          <p>2.8k</p>
          <span>Following</span>
        </div>
        <div className={classes.vertical}></div>
        <div className={classes.stat}>
          <p>500k</p>
          <span>Followers</span>
        </div>
      </main>
    </section>
  );
};

export default ProfileSection;
