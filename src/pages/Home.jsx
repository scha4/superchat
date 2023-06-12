import React from "react";
import NavbarComp from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

function Home() {
  return (
    <>
      <NavbarComp />

      <div className="flex  ">
        <Sidebar />
        <Chat />
      </div>
    </>
  );
}

export default Home;
