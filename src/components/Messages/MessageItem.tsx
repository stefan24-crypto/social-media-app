import React from "react";
import ProfileCirlcle from "../../UI/ProfileCirlcle";
import classes from "./MessageItem.module.css";
import inbox from "../../images/inbox.png";
import to from "../../images/paper-plane.png";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../store/hooks";
import { Badge } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

interface MessageItemProps {
  lastMessage: any;
  lastMessageTime: Timestamp;
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
  const curUser = useAppSelector((state) => state.auth.curUser);
  const thisDm = useAppSelector((state) => state.data.dms).find(
    (each) => each.id === id
  );
  const sortedArrOfMessages = [...thisDm!.messages];
  sortedArrOfMessages.sort((a, b) => a.time.seconds - b.time.seconds);

  const messageRead = async () => {
    if (clickedChatWhereNotSender()) {
      const dmDoc = doc(db, "dms", id);
      const newFields = {
        receiverHasRead: true,
      };
      await updateDoc(dmDoc, newFields);
    } else {
      console.log("Clicked message where the user was the sender");
    }
  };

  const clickedChatWhereNotSender = () =>
    sortedArrOfMessages.at(-1)?.author !== curUser?.displayName;

  const goToChatRoomHandler = async () => {
    messageRead();
    navigate(`/dm/${id}`);
  };

  return (
    <div
      className={classes.message}
      onClick={goToChatRoomHandler}
      style={{
        borderLeft: "2px solid",
        borderImageSlice:
          thisDm?.receiverHasRead === false &&
          curUser?.displayName !== sortedArrOfMessages.at(-1)?.author
            ? "1"
            : "0",
        borderImageSource:
          "linear-gradient(to top, var(--pink), var(--orange))",
      }}
    >
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
          <p>{lastMessage.text}</p>
          {isTo ? (
            <FontAwesomeIcon icon={faPaperPlane} className={classes.icon} />
          ) : (
            <img className={classes.icon} src={inbox} alt="from" />
          )}
        </div>
      </div>
      <div className={classes.right}>
        <p>{lastMessageTime.toDate().toDateString()}</p>
      </div>
    </div>
  );
};

export default MessageItem;
