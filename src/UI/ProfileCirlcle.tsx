import { width } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router";
import classes from "./ProfileCircle.module.css";

interface ProfileCirlcleProps {
  src: string;
  bgColor?: string;
  id?: string;
  width?: string;
  height?: string;
  paddingOnGradient?: string;
  paddingOnImage?: string;
  clickable?: boolean;
}

const ProfileCirlcle: React.FC<ProfileCirlcleProps> = ({
  src,
  bgColor,
  width,
  height,
  id,
  paddingOnGradient,
  paddingOnImage,
  clickable,
}) => {
  const navigate = useNavigate();
  let profileClasses = `${classes.profile}`;
  const click = clickable ? () => navigate(`/profile/${id}`) : () => {};
  if (clickable) {
    profileClasses += ` ${classes.hovering}`;
  }
  return (
    <div
      className={classes.img_div}
      onClick={click}
      style={{ padding: paddingOnGradient }}
    >
      <div
        className={classes.inner}
        style={{
          backgroundColor: bgColor,
          width: width,
          height: height,
          padding: paddingOnImage,
        }}
      >
        <img src={src} className={profileClasses} alt="profile" />
      </div>
    </div>
  );
};

export default ProfileCirlcle;
