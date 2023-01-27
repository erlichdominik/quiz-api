import React, { useEffect, useState } from "react";
import User from "./User";

import useLanguageContext from "../../hooks/useLanguageContext";
import usePrivateRequests from "../../hooks/usePrivateRequests";
import Card from "../ui/Card";
import BackgroundWrapper from "../ui/BackgroundWrapper";
import Navbar from "../ui/Navbar";
import { Link } from "react-router-dom";

const transformDataResponse = (responseData) =>
  responseData.users.map((user) => ({
    id: user.id,
    name: user.email,
    role: user.role,
  }));

const GET_USERS_URL = "/admin/users";
const DELETE_USERS_URL = "/admin/delete/all";
const DELETE_USER_URL = (userId) => `/admin/${userId}`;

const AllUsers = ({ group }) => {
  const { nameLib } = useLanguageContext();
  const [users, setUsers] = useState([]);

  const getUsersParams = {
    url: GET_USERS_URL,
  };
  const getUsersRequest = usePrivateRequests(getUsersParams);

  const deleteAllUsersParams = {
    url: DELETE_USERS_URL,
    requestType: "POST",
    loadType: "SELF_LOAD",
  };
  const deleteUsersRequest = usePrivateRequests(deleteAllUsersParams);

  const deleteSingleUserParams = {
    requestType: "DELETE",
    loadType: "SELF_LOAD",
  };
  const deleteUserRequest = usePrivateRequests(deleteSingleUserParams);

  useEffect(() => {
    if (!getUsersRequest.isLoading && getUsersRequest.responseCode === 200) {
      console.log(transformDataResponse(getUsersRequest.responseData));
      setUsers(transformDataResponse(getUsersRequest.responseData));
    }
  }, [getUsersRequest.isLoading, getUsersRequest.responseCode]);

  const handleDeleteAllUsers = async () => {
    const response = await deleteUsersRequest.performRequest();
    console.log("delete all users response", response);
  };

  const handleDeleteSingleUser = async (studentId) => {
    const response = await deleteUserRequest.performRequest(
      DELETE_USER_URL(studentId)
    );
    console.log("delete single user response, ", response);
  };

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
                <User user={user} onClickDelete={handleDeleteSingleUser} />
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
