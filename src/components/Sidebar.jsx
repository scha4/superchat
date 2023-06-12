import { Card } from "@material-tailwind/react";
import { useState } from "react";
import Search from "./Search";

import Chats from "./Chats";

export default function Sidebar() {
  return (
    <Card className="relative top-4  h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5  hidden lg:flex">
      <Search />
      <Chats />
    </Card>
  );
}
