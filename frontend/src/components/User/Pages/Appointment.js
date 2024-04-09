import React from "react";
import Doctors from "../Doctors";
import UpcomingAppointments from "../../UpcomingAppointments";
import PendingAppointments from "../../PendingAppointments";

const Appointment = () => {
  return (
    <>
      <UpcomingAppointments role="user"/>
      <PendingAppointments role="user"/>
      <Doctors />
    </>
  );
};

export default Appointment;
