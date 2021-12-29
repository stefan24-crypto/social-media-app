import React from "react";
import classes from "./ProfileCircle.module.css";

interface ProfileCirlcleProps {
  src: string;
}

const ProfileCirlcle: React.FC<ProfileCirlcleProps> = ({ src }) => {
  return (
    <div className={classes.img_div}>
      <div className={classes.inner}>
        <img src={src} className={classes.profile} alt="profile" />
      </div>
    </div>
  );
};

export default ProfileCirlcle;
