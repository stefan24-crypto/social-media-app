import React from "react";
import classes from "./Comment.module.css";

interface CommentProps {
  text: string;
  id: string;
  author: string;
}

const Comment: React.FC<CommentProps> = ({ id, text, author }) => {
  return (
    <div className={classes.comment}>
      <div className={classes.text}>
        <p>{text}</p>
      </div>
      <div className={classes.author_and_time}>
        <p>{author}</p>
      </div>
    </div>
  );
};

export default Comment;
