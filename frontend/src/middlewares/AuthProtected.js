import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { GlobalState } from "./global-states";
import Cookies from "js-cookie";
import axios from "axios";

const UserProtected = ({ children, currentRole }) => {
  const { data, dispatch } = useContext(GlobalState);
  const [isLoading, setIsLoading] = useState(false);
  let headers;
  const token = Cookies.get("authToken");
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    headers = { Authorization: `Bearer ${token}` };
    const path = window.location.pathname;
    const endIndex = path.indexOf("/", 1);
    let currentPath = "/";
    if (endIndex !== -1) {
      currentPath = path.substring(1, endIndex);
    } else if (path.length > 1) {
      currentPath = path.substring(1);
    }

    async function fetchData() {
      await axios
        .get(`${process.env.REACT_APP_API_URL}/user/me`, { headers })
        .then((res) => {
          console.log(currentPath);
          const pathName = window.location.pathname.toLowerCase();
          switch (res.data.role) {
            case "User": {
              if (pathName.includes("user") || pathName === "/") {
                storeData(res.data);
                if (pathName !== "/") {
                  preventRegForm(currentPath);
                }
              } else {
                navigate(`/${currentPath}/verify`);
              }
              break;
            }
            case "Doctor": {
              if (pathName.includes("doctor") || pathName === "/") {
                storeData(res.data);
                if (pathName !== "/") {
                  preventRegForm(currentPath);
                }
                preventRegForm(currentPath);
              } else {
                navigate(`/${currentPath}/verify`);
              }
              break;
            }
            default: {
              navigate("/");
              break;
            }
          }
        })
        .catch((err) => {
          console.log(err);
          navigate("/");
        });
    }
    if (token) {
      fetchData();
    } else if (path.includes("signup") || path.includes("verify")) {
    } else {
      navigate("/");
    }

    setIsLoading(false);
  }, [token]);

  const preventRegForm = (currentPath) => {
    console.log("called inside preventREG form", currentPath);
    if (
      window.location.pathname.includes("verify") ||
      window.location.pathname.includes("signup")
    ) {
      navigate(`/${currentPath}`);
    }
  };

  const storeData = (res) => {
    dispatch({ type: "SET_USER", payload: res });
    dispatch({ type: "IS_LOGGED", payload: true });
    dispatch({ type: "SET_ROLE", payload: res.role });
  };

  return <>{!isLoading && children}</>;
};

export default UserProtected;