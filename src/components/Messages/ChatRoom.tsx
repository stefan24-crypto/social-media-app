import React, { useEffect, useRef } from "react";
import { useAppSelector } from "../../store/hooks";
import ProfileCirlcle from "../../UI/ProfileCirlcle";
import classes from "./ChatRoom.module.css";
import Text from "./Text";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";

interface ChatRoomProps {
  id: string;
  messageRead: (id: string, arrOfMessages: any[]) => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ id, messageRead }) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const curUser = useAppSelector((state) => state.auth.curUser);
  const dms = useAppSelector((state) => state.data.dms);
  const thisChatRoom = dms.find((each) => each.id === id);
  if (!thisChatRoom)
    return (
      <div className={classes.initial}>
        <h1>Select a Chat</h1>
      </div>
    );
  const sortedMessages = [...thisChatRoom.messages];
  sortedMessages.sort((a, b) => a.time.seconds - b.time.seconds);

  const otherPerson = thisChatRoom?.people.find(
    (each) => each.name !== curUser?.displayName
  );

  const addMessageHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (textInputRef.current?.value.trim().length === 0) return;
    const dmDoc = doc(db, "dms", id);
    const unique_id = uuid();
    const newFields = {
      messages: [
        ...thisChatRoom.messages,
        {
          id: unique_id,
          text: textInputRef.current!.value,
          time: Timestamp.now(),
          to: otherPerson!.name,
          author: curUser?.displayName,
        },
      ],
      receiverHasRead: false,
    };
    await updateDoc(dmDoc, newFields);
    textInputRef.current!.value = "";
  };

  return (
    <section className={classes.chatroom}>
      <header className={classes.header}>
        <img
          src={otherPerson?.profile_pic}
          alt="profile_pic"
          className={classes.img}
        />
        <p>{otherPerson?.name}</p>
      </header>
      <main className={classes.messages}>
        {thisChatRoom.messages.map((each) => (
          <Text
            time={each.time}
            text={each.text}
            toWhom={each.to}
            key={each.id}
            author={each.author}
          />
        ))}
      </main>
      <form className={classes.footer} onSubmit={addMessageHandler}>
        <input
          type="text"
          placeholder="Message..."
          ref={textInputRef}
          onClick={() => messageRead(id, sortedMessages)}
        />
      </form>
    </section>
  );
};

export default ChatRoom;
