import React, { useContext, useEffect, useState } from "react";

import Message from "./Message";
import { ChatContext } from "../ChatContext";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [data.chatId]);
  console.log(messages);
  return (
    <>
      <div className="bg-white w-full  h-[calc(100vh-12rem)] border-2  overflow-scroll ">
        <div className="mb-10">
          {messages.map((m) => (
            <Message message={m} key={m.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Messages;
