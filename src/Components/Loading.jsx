import React from "react";
import logo from "../images/ietdavv_logo.jpeg";

function Loading({ text }) {
  return (
    <div className="loader-backdrop">
      <img src={logo} height={50} width={50}></img>
      {text}..
    </div>
  );
}

export default Loading;
