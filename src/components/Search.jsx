import React, { useContext, useState } from "react";
import { Button } from "@material-tailwind/react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { BsPersonAdd, BsXLg } from "react-icons/bs";
import { AuthContext } from "../AuthContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };
  return (
    <>
      <div className="search">
        <div className="flex">
          <input
            type="text"
            placeholder="Search friends..."
            className="min-w-[188px] py-1  border-2 border-blue-400 indent-1 rounded-md"
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <Button className="px-5 py-2 ml-2" onClick={handleSearch}>
            search
          </Button>
        </div>
        {err && <span>User not found!</span>}
        {user && (
          <div
            className=" border-2 bg-white border-black  h-10 mt-1 flex items-center justify-between absolute z-1 min-w-[288px] rounded-lg delay-150"
            onClick={handleSelect}
          >
            <div className="flex flex-row items-center">
              <BsPersonAdd size={25} fill="#08f" className="ml-3" />
              <span className="ml-2 text-blue-400 font-bold  ">
                {user.displayName}
              </span>
            </div>
            <BsXLg className="mr-3" size={20} fill="#08f" />
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
