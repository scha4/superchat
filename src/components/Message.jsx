import React from "react";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../AuthContext";
import { ChatContext } from "../ChatContext";

function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  console.log(message);
  return (
    <div
      ref={ref}
      className={`message ${
        message.senderId === currentUser.uid ? "message-end" : " message-start"
      }`}
    >
      <div className="ml-8 mt-8 ">
        <div className="flex flex-row items-center gap-2">
          <div className="font-bold text-xl">
            {message.senderId === currentUser.uid
              ? currentUser.displayName
              : data.user.displayName}
          </div>
          <span className="text-xs text-gray-500">just now</span>
        </div>
        <div className="text-xl border rounded-full border-blue-400 bg-blue-400 py-1  pr-4 w-fit">
          <p className="ml-3 text-white">{message.text}</p>
          {message.img && <img src={message.img} alt="" />}
        </div>
      </div>
    </div>
  );
}

export default Message;
