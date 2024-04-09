import React, { useContext } from "react";
import { AiFillStar } from "react-icons/ai";
import { GlobalState } from "../../middlewares/global-states";

const Doctor = ({ doctor }) => {
  const {dispatch} = useContext(GlobalState);
  const handleAppointment = () => {
    dispatch({type: "SET_DOCTOR_APPOINTMENT", payload: doctor._id})
    dispatch({type: "FIRE_MODAL", payload: "APPOINTMENT"})
  }

  return (
    <div className="min-w-[450px] h-[320px] space-y-3 shadow-2xl p-4">
      <div className="flex space-x-3">
        <img src={doctor?.avatar} alt="" className="w-44 h-56" />
        <div className="space-y-3">
          <p className="w-max px-3 py-1 text-blue-900 bg-blue-300 rounded-xl">
            Professional Doctor
          </p>
          <p className="text-2xl font-bold ">Dr. {doctor.name}</p>
          <p className="text-grey text-lg">{doctor.specialization}</p>
          <p className="text-yellow-400 text-3xl flex space-x-2">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </p>
        </div>
      </div>
      <button className="bg-primary w-full text-white py-4 rounded-lg" onClick={handleAppointment}>
        Book An Appointment
      </button>
    </div>
  );
};

export default Doctor;
