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



function App() {
  const [data, dispatch] = useReducer(reducer, initialState);




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
