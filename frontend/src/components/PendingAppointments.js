import React, { useEffect, useState } from "react";
import Appointment from "./Appointment";
import axios from "axios";
import Cookies from "js-cookie";

const PendingAppointments = ({ role }) => {
  const [appointments, setAppointments] = useState([]);
  const [refreshToggle, setRefreshToggle] = useState(false);

  useEffect(() => {
    const token = Cookies.get("authToken");
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .get(`${process.env.REACT_APP_API_URL}/appointment/pending/${role}`, {
        headers,
      })
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error(err));
  }, [refreshToggle]);

  const handleChange = () => {
    setRefreshToggle(!refreshToggle);
  };

  console.log(appointments);
  return (
    <>
      {appointments.length > 0 && (
        <div className="max-w-6xl w-full flex flex-col justify-between select-none">
          <div className="w-full flex flex-col justify-between py-10 select-none">
            <h1 className="text-3xl font-semibold ">
              {role === "user"
                ? "Pending Appointments"
                : "New Appointments Requests"}
            </h1>
          </div>
          <div className="w-full pb-10 flex space-x-4 overflow-x-scroll">
            {appointments.map((appointment) => {
              return <Appointment appointment={appointment} role={role} change={handleChange}/>;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default PendingAppointments;
