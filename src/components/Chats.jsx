import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { ChatContext } from "../ChatContext";

import { db } from "../firebase";

function Chats() {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <>
      <div className="flex flex-col border-2 border-gray-400 mt-1 py-2">
        {Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
              <div className="font-bold text-l ml-2">
                {chat[1].userInfo.displayName}
              </div>

              <div className="ml-2">{chat[1].lastMessage?.text}</div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Chats;
