import React from "react";
import service1 from "../../assets/service1.svg";
import service2 from "../../assets/service2.svg";
import service3 from "../../assets/service3.svg";

const Service = () => {
  return (
    <div className="max-w-4xl w-full flex flex-col items-center justify-between py-10 space-y-10">
      <div className="w-full flex justify-between">
        <div className="flex flex-col items-center text-center">
          <img src={service1} alt="" className="w-min"/>
          <p className="text-2xl font-bold">Hassle-free time tracking</p>
        </div>
        <div className="flex flex-col items-center  text-center">
          <img src={service2} alt="" />
          <p className="text-2xl font-bold">Useful insights and analytics</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <img src={service3} alt="" />
          <p className="text-2xl font-bold">Daily limits and notifications</p>
        </div>
      </div>
    </div>
  );
};

export default Service;
