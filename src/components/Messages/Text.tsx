import { Timestamp } from "firebase/firestore";
import React from "react";
import { useAppSelector } from "../../store/hooks";
import classes from "./Text.module.css";

interface TextProps {
  text: string;
  toWhom: string;
  time: Timestamp;
  author: string;
}

const Text: React.FC<TextProps> = ({ text, toWhom, author, time }) => {
  const curUser = useAppSelector((state) => state.auth.curUser);
  let textClasses = `${classes.text}`;
  if (author === curUser?.displayName) {
    textClasses += ` ${classes.from}`;
  }
  return (
    <div className={textClasses}>
      <div className={classes.message}>
        <p>{text}</p>
      </div>
      <div className={classes.time}>
        <p>{time.toDate().toDateString()}</p>
      </div>
    </div>
  );
};

export default Text;
