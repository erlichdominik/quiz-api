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
    <div className="fixed top-[8%] left-[12%] sm:left-[28%] w-[24rem] sm:w-[45vw] h-[70vh] z-30 bg-white border border-primaryblue rounded-xl shadow">
      {children}
    </div>
  );
};

const Modal = ({ children, onClose }) => {
  return (
    <>
      <Backdrop onClose={onClose} />
      <ModalOverlay></ModalOverlay>
    </>
  );
};

export default Modal;
