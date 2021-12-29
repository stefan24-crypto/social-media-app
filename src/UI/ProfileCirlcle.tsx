import React from "react";
import classes from "./ProfileCircle.module.css";

interface ProfileCirlcleProps {
  src: string;
  bgColor?: string;
}

const ProfileCirlcle: React.FC<ProfileCirlcleProps> = ({ src, bgColor }) => {
  return (
    <div className={classes.img_div}>
      <div className={classes.inner} style={{ backgroundColor: bgColor }}>
        <img src={src} className={classes.profile} alt="profile" />
      </div>
    </div>
  );
};

export default ProfileCirlcle;
