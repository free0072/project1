import React, { useEffect, useState } from "react";
import axios from "axios";
import Doctor from "./Doctor";

const Doctors = () => {
  const [allDoctors, setAllDoctors] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/doctors`)
      .then((res) => setAllDoctors(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="max-w-6xl w-full flex flex-col justify-between select-none">
      <div className="w-full flex flex-col justify-between py-10 select-none">
        <h1 className="text-3xl font-semibold ">
          Book an Appointment
        </h1>
      </div>
      <div className="w-full pb-10 flex space-x-4 overflow-x-scroll">
        {allDoctors.map((doctor) => {
          return <Doctor key={doctor._id} doctor={doctor} />;
        })}
      </div>
    </div>
  );
};

export default Doctors;
