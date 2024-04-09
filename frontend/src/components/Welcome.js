import React, { useContext } from "react";
import { GlobalState } from "../middlewares/global-states";

const Welcome = () => {
  const {data} = useContext(GlobalState);



  return (
    <div className="max-w-6xl w-full flex flex-col justify-between py-10 space-y-10 select-none">
      <h1 className="text-4xl font-semibold text-grey">Welcome {data?.loggedUser.name},</h1>
    </div>
  );
};

export default Welcome;
