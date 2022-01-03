import React from "react";
import ProfileCirlcle from "../../UI/ProfileCirlcle";
import classes from "./MessageItem.module.css";
import inbox from "../../images/inbox.png";
import to from "../../images/paper-plane.png";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface MessageItemProps {
  lastMessage: string;
  lastMessageTime: Date;
  otherPersonName: string;
  otherPersonPic: string;
  id: string;
  isTo: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({
  lastMessage,
  lastMessageTime,
  otherPersonName,
  otherPersonPic,
  id,
  isTo,
}) => {
  const navigate = useNavigate();
  return (
    <div className={classes.message} onClick={() => navigate(`/dm/${id}`)}>
      <div className={classes.left}>
        <div className={classes.profile}>
          <ProfileCirlcle
            src={otherPersonPic}
            width="30px"
            height="30px"
            paddingOnGradient="1.2px"
            paddingOnImage="2.4px"
            bgColor="#121212"
          />
          <p>{otherPersonName}</p>
        </div>
        <div className={classes.text}>
          <p>{lastMessage}</p>
          {isTo ? (
            <FontAwesomeIcon icon={faPaperPlane} className={classes.icon} />
          ) : (
            <img className={classes.icon} src={inbox} alt="from" />
          )}
        </div>
      </div>
      <div className={classes.right}>
        <p>{lastMessageTime.toDateString()}</p>
      </div>
    </div>
  );
};

export default MessageItem;
