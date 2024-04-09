import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImg from "../assets/signupImg.png";
import { GlobalState } from "../middlewares/global-states";
import Cookies from "js-cookie";
import axios from "axios";

const Signup = ({ currentRole }) => {
  const { dispatch } = useContext(GlobalState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("uid", uid);
    formData.append("password", password);
    if (image !== "") {
      formData.append("image", image);
    }
    

    if (currentRole === "User") {
      formData.append("role", "User")
      await axios
        .post(`${process.env.REACT_APP_API_URL}/user/create`, formData)
        .then((res) => {
          Cookies.set("authToken", res.data.token);
          console.log(res.data);
          dispatch({ type: "FIRE_MODAL", payload: "" });
          navigate(`/user`);
        })
        .catch((err) => alert(err.message));
    } else if (currentRole === "Doctor") {
      formData.append("specialization", specialization);
      formData.append("role", "Doctor")
      await axios
        .post(`${process.env.REACT_APP_API_URL}/user/create`, formData)
        .then((res) => {
          Cookies.set("authToken", res.data.token);
          console.log(res.data);
          dispatch({ type: "FIRE_MODAL", payload: "" });
          navigate(`/doctor`);
        })
        .catch((err) => alert(err.message));
    }
    setIsLoading(false);
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    // setImagePreview(URL.createObjectURL(file));
    setImage(file);
  };

  return (
    <div className="w-full flex flex-col items-center split-bg">
      <div className="max-w-[1600px] w-full flex justify-between ">
        <div className="w-1/2">
          <img className=" w-full min-h-[800px]" src={heroImg} alt="heroImg" />
        </div>
        <div className="w-1/2 flex flex-col justify-center ">
          <form onSubmit={handleSubmit} className="max-w-[700px] p-8">
            <div className="space-y-3">
              <h3 className="text-4xl text-blackk mb-4">
                Sign up as {currentRole}
              </h3>
              <label htmlFor="name" className="flex flex-col">
                <span className="text-2xl">Name</span>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  className="input-form"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label htmlFor="uid" className="flex flex-col">
                <span className="text-2xl">UID</span>
                <input
                  type="text"
                  id="uid"
                  className="input-form"
                  placeholder="UID"
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                />
              </label>
              {currentRole === "Doctor" && (
                <label htmlFor="Specialization" className="flex flex-col">
                  <span className="text-2xl">Specialization</span>
                  <input
                    type="text"
                    id="Specialization"
                    className="input-form"
                    placeholder="Specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                  />
                </label>
              )}
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
              <label htmlFor="Image" className="flex flex-col">
                <span className="text-2xl">Profile Picture</span>
                <input
                  type="file"
                  id="Image"
                  accept="image/*"
                  placeholder="Password"
                  className="input-form"
                  onChange={(e) => handleImage(e)}
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
                {!isLoading ? "Sign up" : "Submiting..."}
              </button>
              <p className="font-bold text-center">
                Already have an account?
                <span
                  className="text-primary cursor-pointer"
                  onClick={(e) => navigate(`/${currentRole}/verify`)}
                >
                  Login Now
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
