import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { FiImage } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { ChatContext } from "../ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";

function Input() {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const handleSend = async () => {
    if (img) {
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImg(null);
  };
  return (
    <>
      <div className="bg-gray-100 flex py-5 items-center justify-center rounded-lg">
        <input
          placeholder="Type here..."
          onChange={(e) => setText(e.target.value)}
          className="border-2 rounded-lg border-blue-400 w-5/6 indent-2"
          value={text}
        />
        {/* <button className="">
          <FiImage size={30} stroke="#08f" />
        </button> */}
        <button className="hover:bg-sky-700" onClick={handleSend}>
          <AiOutlineSend size={30} fill="#08f" className="hover:bg-sky-700" />
        </button>
      </div>
    </>
  );
}

export default Input;
