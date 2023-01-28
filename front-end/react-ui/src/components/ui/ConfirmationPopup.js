import React, { useState } from "react";
import useLanguageContext from "../../hooks/useLanguageContext";

import Card from "../ui/Card";
const ConfirmationPopup = ({ delegatedAction, onRefreshData, onClose }) => {
  const { nameLib } = useLanguageContext();

  const handleNoClicked = () => {
    onClose();
  };

  const handleYesClicked = async () => {
    await delegatedAction();
    onRefreshData();
    onClose();
  };

  return (
    <Card topPadding="1">
      <div className="w-full h-4/5 flex flex-col justify-around items-center">
        <div className="text-2xl">{nameLib.areYouSure}</div>
        <div className="flex justify-evenly w-1/2 space-x-5">
          <div>
            <button
              className="text-xl border border-darkcl px-7 py-1.5 rounded-lg bg-white shadow hover:bg-danger hover:text-white transition"
              onClick={handleNoClicked}
            >
              {nameLib.no}
            </button>
          </div>
          <div>
            <button
              className="text-xl border border-darkcl px-7 py-1.5 rounded-lg bg-white shadow hover:bg-secondaryblue hover:text-white transition"
              onClick={handleYesClicked}
            >
              {nameLib.yes}
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ConfirmationPopup;
