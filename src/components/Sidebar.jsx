import { Card } from "@material-tailwind/react";
import { useState } from "react";
import Search from "./Search";

import Chats from "./Chats";

export default function Sidebar() {
  return (
    <Card className="relative mt-1 mx-2 h-[calc(100vh-2rem)] w-full max-w-[20rem]  shadow-xl shadow-blue-gray-900/5  hidden lg:flex">
      <Chats />
    </Card>
  );
}
