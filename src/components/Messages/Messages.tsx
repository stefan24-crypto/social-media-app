import React from "react";
import { useAppSelector } from "../../store/hooks";
import MessageItem from "./MessageItem";
import classes from "./Messages.module.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

// export const

const Messages: React.FC = () => {
  const curUser = useAppSelector((state) => state.auth.curUser);
  const dms = useAppSelector((state) => state.data.dms);
  if (!curUser)
    return (
      <div className={classes.notLoggedIn}>
        <h1>You need to be logged in to see your messages!</h1>
      </div>
    );

  if (!dms) return <h1>No dms</h1>;

  const yourMessages = dms.filter((each) =>
    each.people.find((person) => person.name === curUser.displayName!)
  );
  const arrOfotherPeople = yourMessages.map((each) =>
    each.people.find((person) => person.name !== curUser.displayName!)
  );
  const arrOfLastMessages = yourMessages.map((each) => each.messages.at(-1));
  console.log(arrOfLastMessages);

  return (
    <section className={classes.message_section}>
      <header className={classes.header}>
        <h1>Messages</h1>
      </header>
      <main className={classes.main}>
        {yourMessages.map((each, i) => (
          <MessageItem
            id={each.id}
            key={each.id}
            isTo={Boolean(arrOfLastMessages[i]!.to !== curUser.displayName)}
            lastMessage={arrOfLastMessages[i]!}
            lastMessageTime={arrOfLastMessages[i]!.time}
            otherPersonName={arrOfotherPeople[i]!.name}
            otherPersonPic={arrOfotherPeople[i]!.profile_pic}
          />
        ))}
      </main>
    </section>
  );
};

export default Messages;
