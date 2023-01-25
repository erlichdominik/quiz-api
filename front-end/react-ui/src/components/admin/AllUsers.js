import React from "react";
import User from "./User";

import useLanguageContext from "../../hooks/useLanguageContext";
import Card from "../ui/Card";
import BackgroundWrapper from "../ui/BackgroundWrapper";
import Navbar from "../ui/Navbar";
import { Link } from "react-router-dom";

const randomInt = () => Math.floor(Math.random() * 99999);

const userData = () => {
  const userList = [];
  for (let i = 0; i < 100; i++) {
    userList.push({
      id: i,
      name: `student ${i}`,
      role: "student",
    });
  }
  return userList;
};

const AllUsers = ({ group }) => {
  const { nameLib } = useLanguageContext();

  const users = userData();

  const handleDeleteAllUsers = () => {};

  return (
    <>
      <BackgroundWrapper>
        <Card>
          <div className="w-[24rem] sm:w-1/2 bg-white rounded-lg border border-primaryblue shadow">
            <div className="text-sm w-full h-10 hover:bg-secondaryblue hover:text-white">
              <Link to="/adminPanel">
                <button className="w-full h-full">
                  {nameLib.backToAdminPanel}
                </button>
              </Link>
            </div>
            <h1 className="pt-2 text-2xl text-center">{nameLib.allUsers}</h1>
            <div className="flex justify-center items-center pt-2">
              <button
                className="border border-darkcl px-3 py-1 rounded-xl text-sm w-[12rem] hover:bg-danger hover:text-white transition"
                onClick={handleDeleteAllUsers}
              >
                {nameLib.deleteAllUsers}
              </button>
            </div>
            <div className="bg-white border border-primaryblue w-11/12 h-[20rem] mt-3 mx-auto grid auto-rows-max grid-cols-3 gap-y-1 rounded-lg  overflow-y-scroll scroll-smooth">
              <div className="m-1  sticky top-0 bg-white text-center col-span-1 z-0">
                {nameLib.usernames}
              </div>
              <div className="m-1  sticky top-0 bg-white text-center col-span-1 z-0">
                {nameLib.roles}
              </div>
              <div className="m-1  sticky top-0 bg-white text-center col-span-1 z-0">
                {nameLib.actions}
              </div>
              {users.map((user) => (
                <User user={user} />
              ))}
            </div>
          </div>
        </Card>
      </BackgroundWrapper>
      <Navbar />
    </>
  );
};

export default AllUsers;
