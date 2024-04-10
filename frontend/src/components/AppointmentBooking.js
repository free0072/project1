import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../middlewares/global-states";
import { ImCross } from "react-icons/im";
import axios from "axios";
import Cookies from "js-cookie";

function AppointmentBooking() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dateError, setDateError] = useState("");
  const [error, setError] = useState("");
  const [doctor, setDoctor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data, dispatch } = useContext(GlobalState);

  useEffect(() => {
    if (data) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/user/${data.doctor_appointment}`
        )
        .then((res) => setDoctor(res.data))
        .catch((error) => setError(error));
    }
  }, [data.doctor_appointment]);

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      setDateError("Please select a future date.");
      setDate("");
    } else {
      setDateError("");
      setDate(e.target.value);
    }
  };

  const close = () => {
    dispatch({ type: "FIRE_MODAL", payload: "" });
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    const currentTime = new Date().toLocaleTimeString();

    if (date === "") {
      setError("Please select a date first.");
    } else if (
      date === new Date().toLocaleDateString() &&
      selectedTime < currentTime
    ) {
      setError("Please select a future time for today.");
    } else {
      setError("");
      setTime(selectedTime);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !time) {
      setError("Please select both date and time.");
      return;
    } else {
      setIsLoading(true);
      const token = Cookies.get("authToken");
      const headers = { Authorization: `Bearer ${token}` };

      axios
        .post(
          `${process.env.REACT_APP_API_URL}/appointment/create`,
          { doctorId: doctor._id, date, time },
          { headers }
        )
        .then((response) => {
          close();
        })
        .catch((err) => console.error(err));
      setIsLoading(false);
    }
  };

  return (
    <div className="min-w-96  absolute top-1/2 -translate-y-1/2 bg-white p-6 select-none">
      <h2 className="text-3xl font-bold mb-10">Appointment Booking</h2>
      <form onSubmit={handleSubmit} className="space-y-6 ">
        <label htmlFor="doctor" className="flex flex-col">
          <span className="text-2xl">Doctor</span>
          <input
            type="text"
            id="doctor"
            placeholder="doctor"
            className="input-form text-grey"
            value={doctor.name}
            disabled={true}
          />
        </label>
        <label htmlFor="Date" className="flex flex-col">
          <span className="text-2xl">Appointment Date</span>
          <input
            type="date"
            id="Date"
            placeholder="Date"
            className="input-form"
            value={date}
            onChange={handleDateChange}
          />
          {dateError && <p className="text-red-600">{dateError}</p>}
        </label>
        <label htmlFor="time" className="flex flex-col">
          <span className="text-2xl">Appointment time</span>
          <input
            type="time"
            id="time"
            placeholder="Time"
            className="input-form"
            value={time}
            onChange={handleTimeChange}
          />
          {error && <p className="text-red-600">{error}</p>}
        </label>
        <button
          type="submit"
          className={`bg-primary w-full text-white py-4 rounded-lg ${
            isLoading ? "opacity-60" : ""
          }`}
          disabled={isLoading}
        >
          {!isLoading ? "Request An Appointment" : "Submiting..."}
        </button>
      </form>
      <div
        className="absolute right-2 top-3 text-red-600 cursor-pointer"
        onClick={close}
      >
        <ImCross />
      </div>
    </div>
  );
}

export default AppointmentBooking;
