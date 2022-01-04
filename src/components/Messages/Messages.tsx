import React, { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import MessageItem from "./MessageItem";
import classes from "./Messages.module.css";
import { collection, doc, updateDoc, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import ChatRoom from "./ChatRoom";
import { Menu, MenuItem } from "@mui/material";
import useStyles from "../../styles";
import { DM } from "../../models";
import { v4 as uuid } from "uuid";

const Messages: React.FC = () => {
  const curUser = useAppSelector((state) => state.auth.curUser);
  const dms = useAppSelector((state) => state.data.dms);
  const yourMessages = dms.filter((each) =>
    each.people.find((person) => person.name === curUser?.displayName)
  );
  const users = useAppSelector((state) => state.data.users);
  const [chatRoomID, setChatRoomId] = useState(yourMessages[0]?.id || "");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const styles = useStyles();
  const dmsCollection = collection(db, "dms");

  if (!curUser)
    return (
      <div className={classes.notLoggedIn}>
        <h1>You need to be logged in to see your messages!</h1>
      </div>
    );
  if (!dms)
    return (
      <div>
        <h1>You have not Messaged anyone yet!</h1>
      </div>
    );

  const changeChatroomID = (id: string) => {
    setChatRoomId(id);
  };
  const messageRead = async (id: string, arrOfMessages: any[]) => {
    if (clickedChatWhereNotSender(arrOfMessages)) {
      const dmDoc = doc(db, "dms", id);
      const newFields = {
        receiverHasRead: true,
      };
      await updateDoc(dmDoc, newFields);
    }
  };
  const clickedChatWhereNotSender = (sortedArrOfMessages: any[]) =>
    sortedArrOfMessages.at(-1)?.author !== curUser?.displayName;

  const allOtherPeople = users
    .map((each) => each.name)
    .filter((item) => item !== curUser.displayName);
  const addContactHandler = async (e: React.MouseEvent<HTMLElement>) => {
    const clickedOnUserData = users.find(
      (each) => each.name === e.currentTarget.textContent
    );
    const unique_id = uuid();

    const data: DM = {
      id: unique_id,
      people: [
        { name: curUser.displayName!, profile_pic: curUser.photoURL! },
        {
          name: clickedOnUserData!.name,
          profile_pic: clickedOnUserData!.profile_pic,
        },
      ],
      messages: [],
      receiverHasRead: false,
    };

    await addDoc(dmsCollection, data);
    setAnchorEl(null);
  };

  return (
    <section className={classes.message_section}>
      <main className={classes.main}>
        <div className={classes.messages}>
          <header className={classes.header}>
            <h1>Messages</h1>
            <div onClick={handleClick}>
              <AddIcCallIcon />
            </div>
            <Menu
              anchorEl={anchorEl}
              open={open}
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
              {allOtherPeople.map((each) => (
                <MenuItem
                  key={each}
                  sx={{ color: "white" }}
                  onClick={addContactHandler}
                >
                  {each}
                </MenuItem>
              ))}
            </Menu>
          </header>
          {yourMessages.map((each) => (
            <MessageItem
              id={each.id}
              key={each.id}
              changeId={changeChatroomID}
              messageRead={messageRead}
            />
          ))}
        </div>
        <ChatRoom id={chatRoomID} messageRead={messageRead} />
      </main>
    </section>
  );
};

export default Messages;
