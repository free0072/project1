import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const Appointment = ({ appointment, role, change }) => {
  const handleAppointment = async (status) => {
    const token = Cookies.get("authToken");
    const headers = { Authorization: `Bearer ${token}` };
    await axios
      .put(
        `${process.env.REACT_APP_API_URL}/appointment/update`,
        {
          appointmentId: appointment._id,
          status: status,
        },
        { headers }
      )
      .then((res) => change())
      .catch((err) => console.log(err));
  };

  console.log(role);

  return (
    <div className="min-w-[380px] max-w-[380px] h-min space-y-3 shadow-2xl p-4 bg-white">
      <div className="bg-grey bg-opacity-60 w-max rounded-md">
        <img
          src={
            role === "user"
              ? appointment.doctor.avatar
              : appointment.patient.avatar
          }
          alt=""
          className="p-4 w-44 h-48 "
        />
      </div>
      <div className="">
        <div className="space-y-3">
          <p className="text-2xl font-bold ">
            {role === "user"
              ? `Dr. ${appointment.doctor.name}`
              : appointment.patient.name}
          </p>
          <div>
            <p className="text-grey text-xl">
              Date:{" "}
              <span className="text-secondary font-bold">
                {appointment.date}
              </span>
            </p>
            <p className="text-grey text-xl">
              Time:{" "}
              <span className="text-secondary font-bold">
                {appointment.time}
              </span>
            </p>
          </div>
          <p className="text-grey text-xl">
            Status:{" "}
            <span
              className={`${
                appointment.status !== "Confirmed"
                  ? "text-red-500"
                  : "text-green-800"
              }  font-bold`}
            >
              {appointment.status}
            </span>
          </p>
        </div>
      </div>
      <div className="w-full flex space-x-4">
        {role === "user" ? (
          <button
            className="bg-red-600 w-full text-white py-4 rounded-lg"
            onClick={() => handleAppointment("Rejected")}
          >
            Cancel
          </button>
        ) : appointment.status !== "Confirmed" ? (
          <>
            <button
              className="bg-red-600 w-full text-white py-4 rounded-lg"
              onClick={() => handleAppointment("Rejected")}
            >
              Cancel
            </button>
            <button
              className="bg-primary w-full text-white py-4 rounded-lg"
              onClick={() => handleAppointment("Confirmed")}
            >
              Accept
            </button>
          </>
        ) : (
          <button
            className="bg-red-600 w-full text-white py-4 rounded-lg"
            onClick={() => handleAppointment("Rejected")}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default Appointment;
