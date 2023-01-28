import React, { useEffect, useState } from "react";
import User from "./User";

import useLanguageContext from "../../hooks/useLanguageContext";
import usePrivateRequests from "../../hooks/usePrivateRequests";
import Card from "../ui/Card";
import BackgroundWrapper from "../ui/BackgroundWrapper";
import Navbar from "../ui/Navbar";
import { Link } from "react-router-dom";
import useConfirmationControls from "../../hooks/useConfirmationControls";
import Modal from "../ui/Modal";
import ConfirmationPopup from "../ui/ConfirmationPopup";

const transformDataResponse = (responseData) =>
  responseData.users.map((user) => ({
    id: user.id,
    name: user.email,
    role: user.role,
  }));

const GET_USERS_URL = "/admin/users";
const DELETE_USERS_URL = "/admin/all";
const DELETE_USER_URL = (userId) => `/admin/${userId}`;

const AllUsers = () => {
  const { nameLib } = useLanguageContext();
  const [users, setUsers] = useState([]);

  const {
    setDisableConfirmation,
    confirmationVisible,
    confirmationAction,
    handleConfirmationClose,
    processAction,
  } = useConfirmationControls();

  const getUsersParams = {
    url: GET_USERS_URL,
  };
  const getUsersRequest = usePrivateRequests(getUsersParams);

  const deleteAllUsersParams = {
    url: DELETE_USERS_URL,
    requestType: "DELETE",
    loadType: "SELF_LOAD",
  };
  const deleteUsersRequest = usePrivateRequests(deleteAllUsersParams);

  const deleteSingleUserParams = {
    requestType: "DELETE",
    loadType: "SELF_LOAD",
  };
  const deleteUserRequest = usePrivateRequests(deleteSingleUserParams);

  const loadUserData = async () => {
    const response = await getUsersRequest.performRequest();
    setUsers(transformDataResponse(response.data));
  };

  useEffect(() => {
    loadUserData();
  }, [getUsersRequest.isLoading, getUsersRequest.responseCode]);

  const handleDeleteAllUsers = async () => {
    processAction(
      () => deleteUsersRequest.performRequest(),
      () => loadUserData()
    );
  };

  const handleDeleteSingleUser = async (studentId) => {
    processAction(
      () => deleteUserRequest.performRequest(DELETE_USER_URL(studentId)),
      () => loadUserData()
    );
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
            <div className="mx-auto w-fit py-2">
              <label className="px-2" htmlFor="disableActionConfirmation">
                {nameLib.disableActionConfirmation}
              </label>
              <input
                className="align-middle"
                type="checkbox"
                id="disableActionConfirmation"
                onClick={() => setDisableConfirmation((prev) => !prev)}
              />
            </div>
            <div className="bg-white border border-primaryblue w-11/12 min-h-[60%] mt-3 mx-auto grid auto-rows-max grid-cols-3 gap-y-1 rounded-lg  overflow-y-scroll scroll-smooth">
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
        {confirmationVisible && (
          <Modal shouldCloseOnBackgroundClick={false}>
            <ConfirmationPopup
              onClose={handleConfirmationClose}
              delegatedAction={confirmationAction}
              onRefreshData={loadUserData}
            />
          </Modal>
        )}
      </BackgroundWrapper>
      <Navbar />
    </>
  );
};

export default AllUsers;
