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
      <div className="flex flex-col border-2 border-gray-400 mt-1 h-5/6 rounded-lg ">
        <div className="text-xl font-bold text-center bg-gray-200 py-3 text-blue-300">
          Chats
        </div>
        {Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              className="border-2   py-1 rounded-lg mt-1 h-16 overflow-scroll"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <div className="font-bold text-l ml-2 ">
                {chat[1].userInfo.displayName}
              </div>

              <div className="ml-2 text-xs">{chat[1].lastMessage?.text}</div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Chats;
