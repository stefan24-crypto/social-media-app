import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import classes from "./Top.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Button from "../../UI/Button";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

const Top: React.FC = () => {
  return (
    <section className={classes.top}>
      <header className={classes.input_div}>
        <div className={classes.search}>
          <SearchIcon />
        </div>
        <input type="text" className={classes.input} placeholder="Search" />
      </header>
      <main className={classes.second_container}>
        <div className={classes.icon}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </div>
        <Button className={classes.add_btn}>
          <AddCircleOutlinedIcon sx={{ opacity: 0.6 }} />
          <p>Add Photo</p>
        </Button>
      </main>
    </section>
  );
};

export default Top;
