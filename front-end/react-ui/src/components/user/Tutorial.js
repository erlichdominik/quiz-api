import React from "react";

import useLanguageContext from "../../hooks/useLanguageContext";
import BackgroundWrapper from "../ui/BackgroundWrapper";
import Card from "../ui/Card";
import Navbar from "../ui/Navbar";

const Tutorial = () => {
  const { nameLib } = useLanguageContext();

  return (
    <BackgroundWrapper>
      <Card>
        <div className="flex flex-col">
          <h1 className="text-2xl text-center pt-20 ">
            {nameLib.tutorialHeader}
          </h1>
          <div className="text-xs">{nameLib.tutorialBasicsCont}</div>
        </div>
      </Card>
      <Navbar></Navbar>
    </BackgroundWrapper>
  );
};

export default Tutorial;
