import React from "react";
import classes from "./Navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../images/instagram-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faPortrait } from "@fortawesome/free-solid-svg-icons";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import text from "../../images/ig-text.png";
import ProfileSection from "./ProfileSection";
import CategoryIcon from "@mui/icons-material/Category";
import { useAppSelector } from "../../store/hooks";
import { auth } from "../../firebase";

const Navbar: React.FC = () => {
  const user = useAppSelector((state) => state.auth.curUser);
  const users = useAppSelector((state) => state.data.users);
  const curUser = users.find((each) => each.name === user?.displayName);
  const navigate = useNavigate();
  return (
    <nav className={classes.nav}>
      <div className={classes.logo}>
        <img src={logo} className={classes.img} alt="icon" />
        <img src={text} className={classes.text} alt="text}" />
      </div>
      <ProfileSection />
      <div className={classes.links}>
        <NavLink
          to="/"
          className={(state) => {
            return `${classes.link} ${state.isActive ? classes.active : ""}`;
          }}
        >
          <FontAwesomeIcon icon={faHome} className={classes.icon} />
          <p>Home</p>
        </NavLink>
        <NavLink
          to="/feed"
          className={(state) => {
            return `${classes.link} ${state.isActive ? classes.active : ""}`;
          }}
        >
          <CategoryIcon sx={{ fontSize: "1rem" }} />
          <p>Category</p>
        </NavLink>
        <NavLink
          to="/dm"
          className={(state) => {
            return `${classes.link} ${state.isActive ? classes.active : ""}`;
          }}
        >
          <FontAwesomeIcon icon={faPaperPlane} className={classes.icon} />
          <p>Direct</p>
        </NavLink>
        <NavLink
          to={`/profile/${curUser?.id}`}
          className={(state) => {
            return `${classes.link} ${state.isActive ? classes.active : ""}`;
          }}
        >
          <FontAwesomeIcon icon={faUserCircle} className={classes.icon} />
          <p>Profile</p>
        </NavLink>
        {curUser ? (
          <div
            className={classes.logout}
            onClick={() => {
              auth.signOut();
              navigate("/");
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <p>Logout</p>
          </div>
        ) : (
          <NavLink
            to="/login"
            className={(state) => {
              return `${classes.link} ${state.isActive ? classes.active : ""}`;
            }}
          >
            <FontAwesomeIcon icon={faSignInAlt} className={classes.icon} />
            <p>Login</p>
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
