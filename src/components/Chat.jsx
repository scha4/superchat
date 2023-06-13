import React from "react";
import Messages from "./Messages";
import Input from "./Input";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  BsFillCameraVideoFill,
  BsPersonAdd,
  BsThreeDots,
} from "react-icons/bs";
import { ChatContext } from "../ChatContext";

function Chat() {
  const { data } = useContext(ChatContext);
  return (
    <>
      <div className="w-full  bg-blue-400  h-[calc(100vh-11rem)] rounded mx-2 mt-2">
        <div className="flex items-center justify-center py-5 mx-3 ">
          <div className="text-xl font-bold text-white">
            {data.user?.displayName}
          </div>
          <div className="flex gap-x-2">
            {/* <BsFillCameraVideoFill size={25} />
            <BsPersonAdd size={25} />
            <BsThreeDots size={25} /> */}
          </div>
        </div>
        <div className=" flex flex-col  ">
          <Messages />
          <Input />
        </div>
      </div>
    </>
  );
}

export default Chat;
