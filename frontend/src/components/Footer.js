import React from "react";
import logo from "../assets/footerlogo.png";

const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center px-4 bg-background py-10 shade select-none">
      <div className="max-w-6xl min-h-[300px] w-full p-2 flex justify-between my-2">
        <div className="h-full flex flex-col justify-between space-y-10">
          <div className="flex">
            <img src={logo} alt="logo" className="cursor-pointer " />
          </div>
          <div className="flex space-x-2">
            <input
              type="input-form"
              className="w-96 px-4 py-3 bg-slate-200 rounded-l-2xl"
              placeholder="jane@domain.com"
            />
            <button className="px-8 py-4 font-bold rounded-r-2xl bg-slate-200">
              Subscribe
            </button>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-3xl mb-10">SERVICES</h1>
          <p className="footermenu">Home</p>
          <p className="footermenu">Services</p>
          <p className="footermenu">Appointments</p>
          <p className="footermenu">Doctors</p>
        </div>
        <div>
          <h1 className="font-bold text-3xl  mb-10">Resources</h1>
          <p className="footermenu">Contact</p>
          <p className="footermenu">About us</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
