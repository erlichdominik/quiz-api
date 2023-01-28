import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useLanguageContext from "../../hooks/useLanguageContext";
import usePrivateRequests from "../../hooks/usePrivateRequests";
import BackgroundWrapper from "../ui/BackgroundWrapper";
import Card from "../ui/Card";
import Navbar from "../ui/Navbar";
import AdminGroupTable from "./AdminGroupTable";

const transformResponseData = (responseData) =>
  responseData.map((group) => ({
    id: group.id,
    groupCode: group.groupCode,
    name: group.groupName,
    //teacherName: group.teacherName
  }));
// group:
// name:
// groupCode
// teacherName

const GET_ADMIN_GROUPS_URL = "/admin/groupsbyteacher";
const AdminGroups = () => {
  const { nameLib } = useLanguageContext();
  const [groups, setGroups] = useState([]);

  const { isLoading, responseData, infoMessage, performRequest } =
    usePrivateRequests({
      url: GET_ADMIN_GROUPS_URL,
    });

  const refreshGroupData = async () => {
    const response = await performRequest();
    setGroups(transformResponseData(response.data.groups));
  };

  const handleGroupDelete = () => {
    refreshGroupData();
  };

  useEffect(() => {
    if (!isLoading) {
      setGroups(transformResponseData(responseData.groups));
    }
  }, [isLoading]);

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
            <h1 className="pt-2 text-2xl text-center">{nameLib.groups}</h1>
            <div className="w-full h-3/4 mx-auto pt-2">
              <AdminGroupTable
                groups={groups}
                onGroupDelete={handleGroupDelete}
              />
            </div>
          </div>
        </Card>
      </BackgroundWrapper>
      <Navbar />
    </>
  );
};

export default AdminGroups;
