// import React, { useState } from "react";
// import { TextField, Button, Select, MenuItem } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { adminLogin } from "../../services/AdminService";
// import { doctorLogin } from "../../services/DoctorService";
// import { patientLogin } from "../../services/PatientService";


// function LoginForm() {
//   // State variables for login credentials
//   const [role, setRole] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const nav = useNavigate();
  
//   // Handler function for role change
//   const handleRoleChange = (event) => {
//     setRole(event.target.value);
//   };

//   // Handler function for email change
//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   // Handler function for password change
//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   // Handler function for form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Perform actions like submitting data or validation
//     switch (role) {
//       case "Admin":
//         const admin = { email: email, password: password };
//         adminLogin(admin).then((res) => {
//           console.log(res.data);
//           nav("/dashboard");
//         });
//         break;
//       case "Doctor":
//         const Doc = { email: email, password: password };
//         doctorLogin(Doc).then((res) => {
//           console.log(res.data);
//           nav("/dashboard");
//         });
//         break;
//       case "Patient":
//         const Pat = { email: email, password: password };
//         patientLogin(Pat).then((res) => {
//           console.log(res.data);
//           nav("/dashboard");
//         });
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <div className="login-form">
//       <h2>Hospital Management System</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Dropdown menu for role selection */}
//         <Select
//           label="Role"
//           variant="outlined"
//           fullWidth
//           value={role}
//           onChange={handleRoleChange}
//           className="select-field"
//         >
//           <MenuItem value="admin">Admin</MenuItem>
//           <MenuItem value="doctor">Doctor</MenuItem>
//           <MenuItem value="patient">Patient</MenuItem>
//         </Select>
//         <TextField
//           label="email"
//           variant="outlined"
//           fullWidth
//           value={email}
//           onChange={handleEmailChange}
//           className="text-field"
//         />
//         <TextField
//           label="Password"
//           type="password"
//           variant="outlined"
//           className="text-field"
//           fullWidth
//           value={password}
//           onChange={handlePasswordChange}
//         />
//         <Button
//           variant="contained"
//           className="login-button"
//           color="primary"
//           type="submit"
//         >
//           Login
//         </Button>
//       </form>
//     </div>
//   );
// }

// export default LoginForm;
