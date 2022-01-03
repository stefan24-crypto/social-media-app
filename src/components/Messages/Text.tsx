import React from "react";
import classes from "./Text.module.css";

interface TextProps {
  text: string;
  isFromCurUser: boolean;
  time: Date;
}

const Text: React.FC<TextProps> = ({ text, isFromCurUser, time }) => {
  let textClasses = `${classes.text}`;
  if (isFromCurUser) {
    textClasses += ` ${classes.from}`;
  }
  return (
    <div className={textClasses}>
      <div className={classes.message}>
        <p>{text}</p>
      </div>
      <div className={classes.time}>
        <p>{time.toDateString()}</p>
      </div>
    </div>
  );
};

export default Text;
