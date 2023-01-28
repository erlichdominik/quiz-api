import React from "react";

const Backdrop = ({ onClose }) => {
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen z-20 backdrop-blur-sm cursor-pointer"
      onClick={onClose}
    ></div>
  );
};

const ModalOverlay = ({ children }) => {
  return (
    <div className="fixed top-1/3 left-1/2 -translate-y-1/3 -translate-x-1/2 w-[20rem] sm:w-[30rem] h-[70vh] z-30 bg-white border border-primaryblue rounded-xl shadow">
      {children}
    </div>
  );
};

const Modal = ({ children, onClose, shouldCloseOnBackgroundClick = true }) => {
  return (
    <>
      <Backdrop onClose={shouldCloseOnBackgroundClick ? onClose : () => {}} />
      <ModalOverlay>{children}</ModalOverlay>
    </>
  );
};

export default Modal;
