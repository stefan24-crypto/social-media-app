import React, { useEffect, useRef } from "react";
import { useAppSelector } from "../../store/hooks";
import ProfileCirlcle from "../../UI/ProfileCirlcle";
import classes from "./ChatRoom.module.css";
import Text from "./Text";

interface ChatRoomProps {
  id: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ id }) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  const curUser = useAppSelector((state) => state.auth.curUser);
  const dms = useAppSelector((state) => state.data.dms);
  const thisChatRoom = dms.find((each) => each.id === id);
  if (!thisChatRoom) return <h1>No Chat Room</h1>;

  const otherPerson = thisChatRoom?.people.find(
    (each) => each.name !== curUser?.displayName
  );

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
            isFromCurUser={Boolean(each.to !== curUser?.displayName)}
            key={each.id}
          />
        ))}
      </main>
      <footer className={classes.footer}>
        <input type="text" placeholder="Message..." ref={textInputRef} />
      </footer>
    </section>
  );
};

export default ChatRoom;
