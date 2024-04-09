import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImg from "../assets/signupImg.png";
import { GlobalState } from "../middlewares/global-states";
import Cookies from "js-cookie";
import axios from "axios";


const Login = ({ currentRole }) => {
  const { dispatch } = useContext(GlobalState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);



  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await axios
      .post(`${process.env.REACT_APP_API_URL}/user/verify`, {
        email: email,
        password: password,
        role: { currentRole },
      })
      .then((res) => {
        Cookies.set("authToken", res.data.token);
        console.log(res.data);
        dispatch({ type: "FIRE_MODAL", payload: "" });
        navigate(`/${currentRole}`);
      })
      .catch((err) => alert(err.message));
    setIsLoading(false);
  };

  return (
    <div className="w-full flex flex-col items-center split-bg">
      <div className="max-w-[1600px] w-full flex justify-between ">
        <div className="w-1/2">
          <img className=" w-full" src={heroImg} alt="heroImg" />
        </div>
        <div className="w-1/2 flex flex-col justify-center ">
          <form onSubmit={handleSubmit} className="max-w-[700px] p-8">
            <div className="space-y-6">
              <h3 className="text-4xl text-blackk mb-4">
                Login as {currentRole}{" "}
              </h3>
              <label htmlFor="email" className="flex flex-col">
                <span className="text-2xl">Email</span>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="input-form"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label htmlFor="password" className="flex flex-col">
                <span className="text-2xl">Password</span>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="input-form"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <div className="my-6 space-y-6">
              <button
                type="submit"
                className={`w-full py-4 bg-primary rounded-md text-whitee font-bold ${
                  isLoading ? "opacity-60" : ""
                }`}
                disabled={isLoading}
              >
                {!isLoading ? "Log in" : "Submiting..."}
              </button>
              <p className="font-bold text-center">
                Create an account?
                <span
                  className="text-primary cursor-pointer"
                  onClick={(e) => navigate(`/${currentRole}/signup`)}
                >
                  Signup Here
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
