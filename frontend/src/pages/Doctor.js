import React from "react";
import { Outlet } from "react-router-dom";
import Welcome from "../components/Welcome";

const Doctor = () => {
  return (
    <div className="w-full flex flex-col items-center px-4">
      {/* <Welcome /> */}
      <Outlet />
    </div>
  );
};

export default Doctor;
