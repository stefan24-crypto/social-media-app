import React from "react";
import { useNavigate } from "react-router";
import classes from "./ProfileCircle.module.css";

interface ProfileCirlcleProps {
  src: string;
  bgColor?: string;
  id?: string;
}

const ProfileCirlcle: React.FC<ProfileCirlcleProps> = ({
  src,
  bgColor,
  id,
}) => {
  const navigate = useNavigate();
  return (
    <div className={classes.img_div} onClick={() => navigate(`/profile/${id}`)}>
      <div className={classes.inner} style={{ backgroundColor: bgColor }}>
        <img src={src} className={classes.profile} alt="profile" />
      </div>
    </div>
  );
};

export default ProfileCirlcle;
