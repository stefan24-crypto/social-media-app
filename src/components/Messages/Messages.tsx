import React, { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import MessageItem from "./MessageItem";
import classes from "./Messages.module.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import ChatRoom from "./ChatRoom";

//Add Messages and ChatRoom Side by Side

const Messages: React.FC = () => {
  const curUser = useAppSelector((state) => state.auth.curUser);
  const dms = useAppSelector((state) => state.data.dms);
  const yourMessages = dms.filter((each) =>
    each.people.find((person) => person.name === curUser?.displayName)
  );
  const [chatRoomID, setChatRoomId] = useState(yourMessages[0].id || "");
  if (!curUser)
    return (
      <div className={classes.notLoggedIn}>
        <h1>You need to be logged in to see your messages!</h1>
      </div>
    );

  if (!dms) return <h1>No dms</h1>;

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

  return (
    <section className={classes.message_section}>
      <main className={classes.main}>
        <div className={classes.messages}>
          <header className={classes.header}>
            <h1>Messages</h1>
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
