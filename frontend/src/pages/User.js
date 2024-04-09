
import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AppointmentBooking from "../components/AppointmentBooking";
import { GlobalState } from "../middlewares/global-states";

const User = () => {
  const { data } = useContext(GlobalState);
  const [states, setStates] = useState(null);
  useEffect(() => {
    setStates(data);
  }, [data]);

  return (
    <>
      {states && states.activeModal === "APPOINTMENT" ? (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50">
          <div className="w-full flex flex-col items-center">
            <AppointmentBooking />
          </div>
        </div>
      ) : null}
      <div className="w-full flex flex-col items-center bg-background">
        <Outlet/>
      </div>
    </>
  );
};

export default User;
