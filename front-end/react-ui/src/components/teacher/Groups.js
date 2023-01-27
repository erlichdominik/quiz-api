import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BackgroundWrapper from "../ui/BackgroundWrapper";
import Card from "../ui/Card";
import Navbar from "../ui/Navbar";
import useLanguageContext from "../../hooks/useLanguageContext";
import GroupTable from "./GroupTable";
import usePrivateRequests from "../../hooks/usePrivateRequests";

const randomInt = () => Math.floor(Math.random() * 99999);

const groupData = () => {
  const groupList = [];
  for (let i = 0; i < 100; i++) {
    groupList.push({
      id: i,
      name: `group ${i}`,
      groupCode: randomInt(),
    });
  }
  return groupList;
};

const transformResponseData = (responseData) =>
  responseData.map((group) => ({
    id: group.id,
    name: group.groupName,
    groupCode: group.groupCode,
  }));

const GROUPS_URL = "/teacher/groups";
const Groups = () => {
  const { nameLib } = useLanguageContext();
  const [groups, setGroups] = useState([]);

  const { isLoading, responseData, infoMessage, performRequest } =
    usePrivateRequests({
      url: GROUPS_URL,
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
              <Link to="/teacherPanel">
                <button className="w-full h-full">
                  {nameLib.backToTeacherPanel}
                </button>
              </Link>
            </div>
            {infoMessage && <p>{infoMessage}</p>}
            <h1 className="pt-2 text-2xl text-center">{nameLib.groups}</h1>
            <div className="w-full h-3/4 mx-auto pt-2">
              {groups.length !== 0 ? (
                <GroupTable groups={groups} onGroupDelete={handleGroupDelete} />
              ) : (
                <>
                  <p className="text-xl text-center pt-10">
                    {nameLib.groupsEmpty}
                  </p>
                </>
              )}
            </div>
          </div>
        </Card>
      </BackgroundWrapper>
      <Navbar />
    </>
  );
};

export default Groups;
