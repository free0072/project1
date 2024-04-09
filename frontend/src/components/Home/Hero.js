import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalState } from "../../middlewares/global-states";

const Hero = () => {
  const { data } = useContext(GlobalState);
  const navigate = useNavigate();

  const handleNavigation = (currentRole ) => {
    if (data.loggedIn) {
      navigate(`/${currentRole}`);
    } else {
      navigate(`/${currentRole}/verify`);
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-4 bg-img">
      <div className="max-w-6xl w-full flex justify-between ">
        <div className="w-[65%] min-h-[900px] flex flex-col justify-center ">
          <div>
            <div className="text-secondary">
              <h1 className="font-bold text-6xl">Your Health, Our Priority</h1>
              <p className="text-xl mt-10 mb-28 max-w-[490px]">
                Book Appointments, Manage/Track Medical Records, Connect with
                Experts
              </p>
            </div>
            <div className="space-x-4">
              <button
                className="btn bg-primary text-white"
                onClick={() => handleNavigation("User")}
              >
                Get Started
              </button>
              <button
                className="btn bg-primary text-white"
                onClick={() => handleNavigation("Doctor")}
              >
                Doctor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
