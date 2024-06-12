import React from "react";
// import "../styles/modal.css";
import { IoMdClose } from "react-icons/io";
import LRImage from "../images/tempbg.jpeg";

const LRSide = ({ children, setModalOpen, handleClick, btnname, mClass }) => {
  return (
      <img src={LRImage} alt="LoginImage" />
  );
};
export default LRSide;
