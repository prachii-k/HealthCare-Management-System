// import React from "react";
// import Button from "@mui/material/Button";
// import logo from "../../images/logo.png";
// import { Link, useNavigate } from "react-router-dom";

// function Dashboard() {
//   const nav = useNavigate();
//   return (
//     <div className="dashboard p-4">
//       <nav className="flex justify-between items-center">
//         <div>
//           <img src={logo} alt="hospital-logo" className="w-[80px] h-[70px]" />
//         </div>
//         <div className="">
//           <Link to="/patients" className="mr-4">
//             View All Patients
//           </Link>
//           <Link to="/doctors" className="mr-4">
//             View All Doctors
//           </Link>
//           <Link to="/appointments" className="mr-4">
//             View All Appointments
//           </Link>
//           <Link to="/register-doctor" className="mr-4">
//             Register Doctor
//           </Link>
//           <Button variant="contained" color="error" onClick={() => nav("/")}>
//             Logout
//           </Button>
//         </div>
//       </nav>
//       <h1 className="text-3xl font-bold mt-8">
//         Welcome to the Hospital Management Dashboard
//       </h1>
//       <div className="display">

//       </div>
//     </div>
//   );
// }

// export default Dashboard;

// 3 button add krne hai
// viewAllPatient
// viewAllDoctors
// ViewAllAppointment

// Showing details from database
// RegisterDr
// create a dropdown menu named Role above email which contains 3 options which are Admin, Doctor and Patient and style it
//  accordingly as the current form is
//login wale main role , email, pass ke liye useState bnanna hai
//ad handlechange and handlesubmit ye add krna hai

//doctor register mei java entity mei jitne variables defined and woh saare register form mei rhega

// same waise hi patient register ka krna ha

// uske baad dono ke handleSubmit ke liye pahle hume service folder mei dono ka service files
// banega as DoctorService and PatientService

// next dono service file mei axios import krna hai and jaise ma'am ne employeeService mei post request banaya hai
//  waise axios.post wala krna hai

// jo service mei url hoga woh jo humne java controller mei requestMapping kri hai uske according hoga

// same also for adminService jisme admin login and register rhega

// and humko useNavigation use krna hai jisse hum different pages pe navigate krenge uske liye "npm i react-router-dom"
// run kr lena

// and baaki admin folder ke andar jo dashboard hai usme hume 5 buttons rhegi top mei

// 5 buttons -> ViewAllPatient, ViewAllDoctors, ViewAllAppointments, RegisterDoctor,

// 	Logout -> logout ke liye java mei shyd HttpSession create krna rhega and usse invalidate krna pdega

// Todays:
// App.js mei ek new Route add krna and path mei "/admin/register" and element mei Admin Register wala component rhega

// then AdminRegister ke andar handleSubmit mei AdminService ka adminService method call hoga jaise
// humne kal Login wale ke liye kiya hai

// uske baad Java mei entities ke andar ek new User class banana hai jisme email and password rhega n
// uske constructor,getter,setter hoga

// and Patient and Doctor controller ke andar hume "/login" ke liye post mapping krni rhegi n uska method rhega
// patientLogin and doctorLogin krke

// jisme humko woh User @RequestBody mei krna hai uske baad hume PatientService and Doctor Service mei similar
// methods banana hai

// and uske arguments mei User class pass krna hai and hume ek DoctorRepo and PatientRepo mei ek new method define
// krna rhega jo unke  emails ke according password fetch krega

// database se and hum User mei jo password hai usse match krenge and boolean mei true false krenge

// DoctorRepo and PatientRepo mei jo method hogi uske liye yeh krna ki Patient wala jo entity class hai usko copy
// krke chatgpt mei daalna and usko bolna ki

// "create a method for PatientRepo which extends Jpa to find get password for specific email" woh method dega usko
// dono ki repository mei add kr dena
// and woh methods ko PatientService and Doctorservice ke login methods mei call krna hai user wale class se user.
// getEmail() argument mei pass krna woh

// password String return krega usko hum user.getPassword() se match krenge

// then jb yeh dono service and controller mei create kr lena tb frontend ke PatientService and Doctorservice mei unke liye requests create krna rhega jaise kal AdminService mei kiya

// tha axios wala then uske baad LoginForm mei handleSubmit mei jo comment krwaya tha waha pe same case "admin" ke liye jaise method mei admin object dala tha waise unke liye

// login wala data send and receive krna rhega

// User class banegi sirf jo entity ya dto kissi mei bhi create kr lena and uske liye other kuch nhi rhega na repo, no service and na controller

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import logo from "../../images/logo.png";
import { CircularProgress } from "@mui/material";
import ListOfPatients from "../patient/ListPatientComp";
import ListOfDoctors from "../doctor/ListDoctorComp";
import { useNavigate } from "react-router-dom";
import { getAllPatients } from "../../services/PatientService";
import { getAllDoctors } from "../../services/DoctorService";
import ListOfAppointments from "../appointment/ListOfAppointments";
import { getAllAppointments } from "../../services/AppoinmentService";

function Dashboard() {
  const [currentView, setCurrentView] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([{}]);

  const nav = useNavigate();

  useEffect(() => {
    if (currentView) {
      fetchData(currentView);
    }
  }, [currentView]);

  const fetchData = async (view) => {
    setLoading(true);
    try {
      let res;
      if (view === "patients") {
        res = await getAllPatients();
      } else if (view === "doctors") {
        res = await getAllDoctors();
      } else if (view === "appointments") {
        res = await getAllAppointments();
      }

      if (res && res.data) {
        setData(res.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = (view) => () => {
    setCurrentView(view);
  };

  const renderContent = () => {
    if (loading) return <CircularProgress />;
    switch (currentView) {
      case "patients":
        return <ListOfPatients data={data} setData={setData} />;
      case "doctors":
        return <ListOfDoctors data={data} setData={setData} />;
      case "appointments":
        return <ListOfAppointments data={data} setData={setData} />;
      default:
        break;
    }
  };

  return (
    <div className="dashboard p-4">
      <nav className="flex justify-between items-center">
        <div>
          <img src={logo} alt="hospital-logo" className="w-[80px] h-[70px]" />
        </div>
        <div>
          <Button
            variant="text"
            onClick={handleLinkClick("patients")}
            className="mr-4"
          >
            View All Patients
          </Button>
          <Button
            variant="text"
            onClick={handleLinkClick("doctors")}
            className="mr-4"
          >
            View All Doctors
          </Button>
          <Button
            variant="text"
            onClick={handleLinkClick("appointments")}
            className="mr-4"
          >
            View All Appointments
          </Button>
          <Button
            variant="text"
            onClick={() => nav("/doctor/register")}
            className="mr-4"
          >
            Register Doctor
          </Button>
          <Button
            variant="contained"
            className=""
            color="error"
            onClick={() => nav("/")}
          >
            Logout
          </Button>
        </div>
      </nav>
      <h1 className="text-3xl font-bold mt-8">
        Welcome to the Hospital Management Dashboard
      </h1>

      <div className="displayContent mt-[5rem]">{renderContent()}</div>
    </div>
  );
}

export default Dashboard;
