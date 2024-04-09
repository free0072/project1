import React from "react";
import UpcomingAppointments from "../../UpcomingAppointments";
import PendingAppointments from "../../PendingAppointments";

const Appointment = () => {
  return (
    <>
      <UpcomingAppointments role="Doctor" />
      <PendingAppointments role="Doctor" />
    </>
  );
};

export default Appointment;
