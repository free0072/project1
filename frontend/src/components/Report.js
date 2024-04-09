import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Report = ({ data }) => {
  const [currDate, setcurrDate] = useState("");
  const [currentTime, setcurrentTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      weekday: "long",
      month: "long",
      year: "numeric",
    };
    const date = new Date(data.date);
    const hours = date.getHours().toString().padStart(2, "0"); // Get hours and ensure 2-digit format
    const minutes = date.getMinutes().toString().padStart(2, "0"); // Get minutes and ensure 2-digit format
    setcurrentTime(`${hours}:${minutes}`);
    setcurrDate(date.toLocaleDateString("en-US", options));
  }, [data]);

  return (
    <div className="w-[450px] space-y-4  bg-whitee shadow-2xl p-4 cursor-pointer">
      <div className="flex justify-between">
        <div className="space-y-4">
          <div className="w-max ">
            <img
              src={data.patientData[0].avatar}
              alt=""
              className="w-44 h-56"
            />
          </div>
        </div>
        <div className="w-1/2 flex flex-col space-y-2 pr-6">
          <div className="flex flex-col">
            <div>
              <p className="font-bold">{data.patientData[0].name}</p>
              <p>Date of Report: {currDate}</p>
            </div>
            <p>Doctor: Dr. {data.doctorData[0].name}</p>
          </div>
          <div>
            <p className="text-header font-bold">Report Summary:</p>
            <p>{data.summary}</p>
          </div>
        </div>
      </div>
      <button
        className="bg-primary w-full text-white py-4 rounded-lg"
        onClick={() => navigate(`/report/${data._id}`)}
      >
        Check Full Report
      </button>
    </div>
  );
};

export default Report;

