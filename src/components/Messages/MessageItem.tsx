import React from "react";
import ProfileCirlcle from "../../UI/ProfileCirlcle";
import classes from "./MessageItem.module.css";
import inbox from "../../images/inbox.png";
import to from "../../images/paper-plane.png";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../store/hooks";
import useShortenText from "../../hooks/useShortenText";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonRemove from "@mui/icons-material/PersonRemove";

interface MessageItemProps {
  id: string;
  changeId: (id: string) => void;
  messageRead: (id: string, arrOfMessages: any[]) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  id,
  changeId,
  messageRead,
}) => {
  let lastMessage;
  const curUser = useAppSelector((state) => state.auth.curUser);
  const thisDm = useAppSelector((state) => state.data.dms).find(
    (each) => each.id === id
  );
  const sortedArrOfMessages = [...thisDm!.messages];
  sortedArrOfMessages.sort((a, b) => a.time.seconds - b.time.seconds);

  if (sortedArrOfMessages.length !== 0) {
    lastMessage = sortedArrOfMessages.at(-1);
  }

  const otherPerson = thisDm?.people.find(
    (each) => each.name !== curUser?.displayName
  );
  const shortened = useShortenText(lastMessage?.text || "", 20);
  const isTo = lastMessage?.to !== curUser?.displayName;
  if (!otherPerson) return <></>;

  const goToChatRoomHandler = async () => {
    messageRead(id, sortedArrOfMessages);
    changeId(id);
  };

  const deleteContactHandler = async () => {
    const dmDoc = doc(db, "dms", id);
    await deleteDoc(dmDoc);
  };

  return (
    <div
      className={classes.message}
      style={{
        borderLeft: "2px solid",
        borderImageSlice:
          thisDm?.receiverHasRead === false &&
          curUser?.displayName !== lastMessage?.author
            ? "1"
            : "0",
        borderImageSource:
          "linear-gradient(to top, var(--pink), var(--orange))",
      }}
    >
      <div className={classes.hover} onClick={goToChatRoomHandler}>
        <div className={classes.profile}>
          <ProfileCirlcle
            src={otherPerson?.profile_pic}
            width="30px"
            height="30px"
            paddingOnGradient="1.2px"
            paddingOnImage="2.4px"
            bgColor="#121212"
          />
          <p>{otherPerson?.name}</p>
        </div>
        <div className={classes.text}>
          <p>{shortened}</p>
        </div>
      </div>
      <div className={classes.icons}>
        {isTo ? (
          <FontAwesomeIcon icon={faPaperPlane} className={classes.icon} />
        ) : (
          <img className={classes.icon} src={inbox} alt="from" />
        )}
        <div onClick={deleteContactHandler}>
          <PersonRemoveIcon sx={{ cursor: "pointer", color: "#e1306c" }} />
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
