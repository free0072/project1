import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../middlewares/global-states";
import axios from "axios";
import Cookies from "js-cookie";
import Report from "../Report";

const SearchedUser = () => {
  const [allReports, setAllReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function searchUser() {
    const token = Cookies.get("authToken");
    const headers = { Authorization: `Bearer ${token}` };

    axios
      .get(`${process.env.REACT_APP_API_URL}/report/all/${searchTerm}`, {
        headers,
      })
      .then((res) => setAllReports(res.data))
      .catch((err) => console.log(err));
  }

  console.log(allReports);
  return (
    <div className="max-w-6xl w-full flex flex-col items-center select-none">
      <div className="flex  w-4/5 text-xl shadow-2xl overflow-hidden rounded-full ">
        <input
          className="w-full px-4 py-3 bg-white focus:outline-none"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search User with thier UID"
        />
        <button
          className="w-2/5 bg-primary text-white rounded-full"
          onClick={searchUser}
        >
          Search
        </button>
      </div>
      {allReports.length > 0 && (
        <>
          <div className="w-full flex flex-col justify-between my-10 select-none">
            <h1 className="text-3xl font-semibold ">Past Reports</h1>
          </div>
          <div className="w-full flex space-x-10  overflow-x-scroll pb-10 mb-10">
            {allReports.map((report) => {
              return <Report key={report._id} data={report} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchedUser;
