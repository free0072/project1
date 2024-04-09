import React, { useEffect, useState } from "react";
import Appointment from "./Appointment";
import axios from "axios";
import Cookies from "js-cookie";

const UpcomingAppointments = ({ role }) => {
  const [appointments, setAppointments] = useState([]);
  const [refreshToggle, setRefreshToggle] = useState(false);

  useEffect(() => {
    const token = Cookies.get("authToken");
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .get(`${process.env.REACT_APP_API_URL}/appointment/upcoming/${role}`, {
        headers,
      })
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = () => {
    setRefreshToggle(!refreshToggle);
  };

  console.log(appointments);

  return (
    <>
      <div className="max-w-6xl w-full flex flex-col justify-between select-none">
        <div className="w-full flex flex-col justify-between py-10 select-none">
          <h1 className="text-3xl font-semibold ">Upcoming Appointments</h1>
        </div>
        <div className="w-full pb-10 flex space-x-4 overflow-x-scroll">
          {appointments.length > 0 ? (
            appointments.map((appointment) => {
              return (
                <Appointment
                  appointment={appointment}
                  role={role}
                  change={handleChange}
                />
              );
            })
          ) : role === "user" ? (
            <p className="text-xl text-blackk">
              No Upcoming Appointment.{" "}
              <span className="text-primary cursor-pointer">
                Book an Appointment
              </span>
            </p>
          ) : (
            <p className="text-xl text-blackk">
              You don't have any Appointment
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default UpcomingAppointments;
