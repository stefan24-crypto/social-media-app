import React from "react";
import classes from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../images/instagram-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import text from "../../images/ig-text.png";
import ProfileSection from "./ProfileSection";
import CategoryIcon from "@mui/icons-material/Category";
import { useAppSelector } from "../../store/hooks";
import { auth } from "../../firebase";
import { Menu, MenuItem, Theme } from "@mui/material";
import { Categories } from "../../models";
import useStyles from "../../styles";
import useGetNumOfDms from "../../hooks/useGetNumOfDms";

const Navbar: React.FC = () => {
  const user = useAppSelector((state) => state.auth.curUser);
  const users = useAppSelector((state) => state.data.users);
  const curUser = users.find((each) => each.name === user?.displayName);
  const dms = useAppSelector((state) => state.data.dms);
  const navigate = useNavigate();
  const styles = useStyles();
  const yourMessages = dms.filter((each) =>
    each.people.find((person) => person.name === curUser?.name)
  );
  // const numOfDms = useGetNumOfDms(yourMessages);

  //Handing Category Menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget.textContent?.trim().length === 0) {
      setAnchorEl(null);
      return;
    }
    navigate(`/category/${e.currentTarget.textContent}`);
    setAnchorEl(null);
  };

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
        <button className={classes.btn} onClick={handleClick}>
          <CategoryIcon sx={{ fontSize: "1rem" }} />
          Category
        </button>
        <Menu
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          classes={{ paper: styles.menuPaper }}
        >
          {Categories.map((each) => (
            <MenuItem onClick={handleClose} key={each} sx={{ color: "white" }}>
              {each}
            </MenuItem>
          ))}
        </Menu>
        <NavLink
          to="/dm"
          className={(state) => {
            return `${classes.link} ${state.isActive ? classes.active : ""}`;
          }}
        >
          <FontAwesomeIcon icon={faPaperPlane} className={classes.icon} />
          <div className={classes.num_of_dms}>
            <p>Direct</p>
            {/* {numOfDms === 0 ? "" : <p>{numOfDms}</p>} */}
          </div>
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
