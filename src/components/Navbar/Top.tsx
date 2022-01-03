import React from "react";
import classes from "./Top.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Button from "../../UI/Button";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router";
import { Badge } from "@mui/material";

const Top: React.FC = () => {
  const curUser = useAppSelector((state) => state.auth.curUser);
  const navigate = useNavigate();
  return (
    <section className={classes.top}>
      <header
        className={classes.input_div}
        style={{ width: curUser ? "50%" : "90%" }}
      >
        <div className={classes.search}>
          <SearchIcon />
        </div>
        <input type="text" className={classes.input} placeholder="Search" />
      </header>
      {curUser && (
        <main className={classes.second_container}>
          <div className={classes.icon} onClick={() => navigate("/dm")}>
            <Badge badgeContent={0} color="warning">
              <FontAwesomeIcon icon={faPaperPlane} />
            </Badge>
          </div>
          <Button className={classes.add_btn} onClick={() => navigate("/add")}>
            <AddCircleOutlinedIcon sx={{ opacity: 0.6 }} />
            <p>Post</p>
          </Button>
        </main>
      )}
    </section>
  );
};

export default Top;
