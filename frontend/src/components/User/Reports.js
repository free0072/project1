import React, { useContext, useEffect, useState } from "react";
import Report from "../Report";
import { GlobalState } from "../../middlewares/global-states";
import axios from "axios";
import Cookies from "js-cookie";

const Reports = () => {
  const [allReports, setAllReports] = useState([]);
  const { data } = useContext(GlobalState);
  useEffect(() => {
    const token = Cookies.get("authToken");
    const headers = { Authorization: `Bearer ${token}` };
    if (data.loggedUser) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/report/all/${data.loggedUser.uid}`,
          { headers }
        )
        .then((res) => setAllReports(res.data))
        .catch((err) => console.log(err));
    }
  }, [data.loggedUser]);

  console.log(allReports);
  return (
    <div className="max-w-6xl w-full flex flex-col justify-between select-none">
      <div className="w-full flex flex-col justify-between py-10 select-none">
        <h1 className="text-3xl font-semibold ">Your Reports</h1>
      </div>
      <div className="w-full flex space-x-4 overflow-x-scroll">
        {allReports.map((report) => {
          return <Report key={report._id} data={report} />;
        })}
      </div>
    </div>
  );
};

export default Reports;
