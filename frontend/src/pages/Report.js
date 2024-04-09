import React, { useEffect, useState } from "react";
import Welcome from "../components/Welcome";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import eye from "../assets/Eye.svg";

const Report = () => {
  const params = useParams();
  const [report, setReport] = useState();
  const [currDate, setcurrDate] = useState("");
  const [currentTime, setcurrentTime] = useState("");

  useEffect(() => {
    const token = Cookies.get("authToken");
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .get(`${process.env.REACT_APP_API_URL}/report/${params.id}`, { headers })
      .then((res) => setReport(res.data))
      .catch((err) => console.error(err));
  }, [params.id]);

  useEffect(() => {
    if (report) {
      const options = {
        weekday: "long",
        date: "numeric",
        month: "long",
        year: "numeric",
      };
      const date = new Date(report.date);
      const hours = date.getHours().toString().padStart(2, "0"); // Get hours and ensure 2-digit format
      const minutes = date.getMinutes().toString().padStart(2, "0"); // Get minutes and ensure 2-digit format
      setcurrentTime(`${hours}:${minutes}`);
      setcurrDate(date.toLocaleDateString("en-US", options));
    }
  }, [report]);

  console.log(report);
  return (
    <div className="w-full flex flex-col items-center ">
      <Welcome />
      {report && (
        <div className="max-w-6xl w-full flex flex-col justify-between py-10 space-y-10 select-none bg-white  shadow-2xl  p-4 my-10">
          <div className="w-full flex text-xl">
            <div className="w-1/2 space-y-4">
              <div className="flex space-x-2">
                <div className="space-y-4 bg-grey bg-opacity-50 rounded-md">
                  <div className="w-max p-4">
                    <img
                      src={report.patient.avatar}
                      alt=""
                      className="w-36 h-40"
                    />
                  </div>
                </div>
                <a href={report.report} target="_blank" className="flex items-center px-4 py-1 rounded-lg bg-primary text-white h-min">
                  <img src={eye} alt="" className="pr-2" /> Check Report File
                </a>
              </div>
              <div>
                <p className="text-header font-bold">Test Conducted:</p>
                <p>{report.tests}</p>
              </div>
              <div>
                <p className="text-header font-bold">Current Status:</p>
                <p>{report.status}</p>
              </div>
              <div>
                <p className="text-header font-bold">Diagnosis:</p>
                <p>{report.diagnosis}</p>
              </div>
            </div>
            <div className="w-1/2 flex flex-col space-y-4">
              <div className="flex flex-col">
                <div>
                  <p className="font-bold">
                    Patient Name: {report.patient.name}
                  </p>
                  <p className="font-bold">
                    Date of Report:{" "}
                    <span className="text-black font-normal">
                      {currDate && currDate}
                    </span>{" "}
                  </p>
                </div>
                <p className="font-bold">
                  Doctor:{" "}
                  <span className="text-black font-normal">
                    Dr. {report.doctor.name}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-header font-bold">Report Summary:</p>
                <p>{report.summary}</p>
              </div>
              <div>
                <p className="text-header font-bold">Follow-up instructions:</p>
                <p>{report.instructions}</p>
              </div>
              <div>
                <p className="text-header font-bold">Treatment Plan:</p>
                <p>{report.treatment}</p>
              </div>
              <div>
                <p className="text-header font-bold">Notes:</p>
                <p>{report.notes}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
