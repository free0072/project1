import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useReducer } from "react";
import {
  initialState,
  reducer,
  GlobalState,
} from "./middlewares/global-states";
import AuthProtected from "./middlewares/AuthProtected";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Hero from "./components/Home/Hero";
import Signup from "./components/Signup";
import Login from "./components/Login";
import User from "./pages/User";
import Doctor from "./pages/Doctor";
import CreateReport from "./components/Doctor/Pages/CreateReport";
import UserHome from "./components/User/Pages/Home";
import DoctorHome from "./components/Doctor/Pages/Home";
import Appointment from "./components/User/Pages/Appointment";
import DocAppointment from "./components/Doctor/Pages/Appointments";
import Report from "./pages/Report";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

function App() {
  const [data, dispatch] = useReducer(reducer, initialState);

  const firebaseConfig = {
    apiKey: "AIzaSyCbH1VbpzJVkI77b2u8aMA3PS6AUziVRZ0",
    authDomain: "heath-668f9.firebaseapp.com",
    databaseURL:
      "https://heath-668f9-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "heath-668f9",
    storageBucket: "heath-668f9.appspot.com",
    messagingSenderId: "772370916873",
    appId: "1:772370916873:web:fcdee932e979cdda937ad8",
    measurementId: "G-N4JY7RVTGV",
  };

  function requestPermission() {
    console.log("Requesting permission...");
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const messaging = getMessaging(app);

        getToken(messaging, {
          vapidKey:
            "BIkUUYVSebXx1_1RtgGcxJGYKIC5DfcLdic1Um9enEvcI1EkZ1Kk2qb3R-iZFZFOWJfVXBPzjuR5dSY8_7hq24A",
        })
          .then((currentToken) => {
            if (currentToken) {
              console.log("currentToken", currentToken);
            } else {
              console.log("no token");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("no permission granted");
      }
    });
  }

  return (
    <div className="App">
      <BrowserRouter>
        <GlobalState.Provider value={{ data: data, dispatch: dispatch }}>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <AuthProtected>
                  <Home />
                </AuthProtected>
              }
            >
              <Route path="" element={<Hero />} />
              <Route
                path="user/signup"
                element={<Signup currentRole={"User"} />}
              />
              <Route
                path="user/verify"
                element={<Login currentRole={"User"} />}
              />
              <Route
                path="doctor/signup"
                element={<Signup currentRole={"Doctor"} />}
              />
              <Route
                path="doctor/verify"
                element={<Login currentRole={"Doctor"} />}
              />
            </Route>
            <Route
              path="/user"
              element={
                <AuthProtected>
                  <User />
                </AuthProtected>
              }
            >
              <Route path="" element={<UserHome />} />
              <Route path="appointment" element={<Appointment />} />
            </Route>
            <Route
              path="/doctor"
              element={
                <AuthProtected>
                  <Doctor />
                </AuthProtected>
              }
            >
              <Route path="" element={<DoctorHome />} />
              <Route path="createReport" element={<CreateReport />} />
              <Route path="appointments" element={<DocAppointment />} />
            </Route>
            <Route path="/report/:id" element={<Report />} />
          </Routes>

          <Footer />
        </GlobalState.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
