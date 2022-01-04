import { Timestamp, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import classes from "./Text.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Menu, MenuItem } from "@mui/material";
import useStyles from "../../styles";
import { doc } from "firebase/firestore";
import { db } from "../../firebase";
import Fade from "@mui/material/Fade";

interface TextProps {
  text: string;
  toWhom: string;
  time: Timestamp;
  author: string;
  id: string;
  dmID: string;
  allMessages: any[];
}

const Text: React.FC<TextProps> = ({
  text,
  toWhom,
  author,
  time,
  id,
  allMessages,
  dmID,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const curUser = useAppSelector((state) => state.auth.curUser);
  const styles = useStyles();
  const open = Boolean(anchorEl);
  let textClasses = `${classes.text}`;

  const deleteMessageHandler = async () => {
    const dmDoc = doc(db, "dms", dmID);
    const filteredMessages = allMessages.filter((each) => each.id !== id);
    const newFields = {
      messages: filteredMessages,
    };
    await updateDoc(dmDoc, newFields);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (author === curUser?.displayName) {
    textClasses += ` ${classes.from}`;
  }

  return (
    <div className={textClasses}>
      <div className={classes.message}>
        <p>{text}</p>
        <div onClick={handleClick}>
          {author === curUser?.displayName && <KeyboardArrowDownIcon />}
        </div>
        <Menu
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          classes={{ paper: styles.menuPaper }}
        >
          <MenuItem sx={{ color: "white" }} onClick={deleteMessageHandler}>
            Delete
          </MenuItem>
        </Menu>
      </div>
      <div className={classes.time}>
        <p>{time.toDate().toDateString()}</p>
      </div>
    </div>
  );
};

export default Text;
