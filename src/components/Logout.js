import React, { useState } from "react";
import { BASE_URL } from "../api";

const Logout = ({ setToken }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };
  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
