import React from "react";
import { useParams } from "react-router";
import ChatRoom from "../components/Messages/ChatRoom";

const ChatRoomPage: React.FC = () => {
  const params = useParams();
  return <ChatRoom id={params.chatroomID!} />;
};

export default ChatRoomPage;
