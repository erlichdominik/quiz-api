import React, { useState } from "react";

const useConfirmationControls = () => {
  const [disableConfirmation, setDisableConfirmation] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);

  const handleConfirmationClose = () => {
    setConfirmationVisible(false);
  };

  const processAction = async (actionToPerform, refreshAction) => {
    if (disableConfirmation === true) {
      await actionToPerform();
      refreshAction();
    } else {
      setConfirmationAction(() => actionToPerform);
      setConfirmationVisible(true);
    }
  };

  return {
    disableConfirmation,
    setDisableConfirmation,
    confirmationVisible,
    setConfirmationVisible,
    confirmationAction,
    setConfirmationAction,
    handleConfirmationClose,
    processAction,
  };
};

export default useConfirmationControls;
