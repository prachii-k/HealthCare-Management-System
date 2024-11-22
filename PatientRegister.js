// import React, { useState } from 'react';
// import { TextField, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { patientRegister } from '../../services/PatientService';

// function PatientRegister() {
//     const [patientInfo, setPatientInfo] = useState({
//         name: '',
//         email: '',
//         password: '',
//         gender: '',
//         bloodGroup: '',
//         contactNo: '',
//         age: ''
//     });
//     const navigate =useNavigate()
//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setPatientInfo(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         patientRegister(patientInfo)
//         .then((res)=>{console.log(res.data)
//         navigate('/')
//         })
//         console.log('Patient Info:', patientInfo);
//         // Add logic to submit data to backend or perform validation
//     };

//     return (
//         <div className="patient-register">
//             <h2>Patient Registration</h2>
//             <form onSubmit={handleSubmit}>
//                 <TextField
//                     label="Name"
//                     variant="outlined"
//                     fullWidth
//                     name="name"
//                     value={patientInfo.name}
//                     onChange={handleChange}
//                 />
//                 <TextField
//                     label="Email"
//                     variant="outlined"
//                     fullWidth
//                     name="email"
//                     value={patientInfo.email}
//                     onChange={handleChange}
//                 />
//                 <TextField
//                     label="Password"
//                     variant="outlined"
//                     fullWidth
//                     type="password"
//                     name="password"
//                     value={patientInfo.password}
//                     onChange={handleChange}
//                 />
//                 <TextField
//                     label="Gender"
//                     variant="outlined"
//                     fullWidth
//                     name="gender"
//                     value={patientInfo.gender}
//                     onChange={handleChange}
//                 />
//                 <TextField
//                     label="Blood Group"
//                     variant="outlined"
//                     fullWidth
//                     name="bloodGroup"
//                     value={patientInfo.bloodGroup}
//                     onChange={handleChange}
//                 />
//                 <TextField
//                     label="Contact Number"
//                     variant="outlined"
//                     fullWidth
//                     name="contactNo"
//                     value={patientInfo.contactNo}
//                     onChange={handleChange}
//                 />
//                 <TextField
//                     label="Age"
//                     variant="outlined"
//                     fullWidth
//                     name="age"
//                     value={patientInfo.age}
//                     onChange={handleChange}
//                 />
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     type="submit"
//                 >
//                     Register
//                 </Button>
//             </form>
//         </div>
//     );
// }

// export default PatientRegister;

import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { patientRegister } from "../../services/PatientService";
import Copyright from "../commons/FooterComp";
import Swal from "sweetalert2";

const defaultTheme = createTheme();

export default function PatientRegister() {
  const navigate = useNavigate();

  const [patient, setPatient] = useState({
    patientName: "",
    email: "",
    password: "",
    gender: "",
    bloodGroup: "",
    contactNo: "",
    age: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    patientRegister(patient)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Patient has been successfully registered!",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/"); // Navigate after the user confirms the alert
          }
        });
        console.log(res.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Failed to register the patient. Please check the details and try again!",
          confirmButtonText: "OK",
        });
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Patient Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="patientName"
                  name="patientName"
                  required
                  fullWidth
                  id="patientName"
                  label="Patient Name"
                  autoFocus
                  value={patient.patientName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={patient.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="contactNo"
                  label="Contact Number"
                  name="contactNo"
                  autoComplete="contactNo"
                  value={patient.contactNo}
                  onChange={handleInputChange}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    value={patient.gender}
                    label="Gender"
                    onChange={handleInputChange}
                    className="text-left"
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  autoComplete="age"
                  type="number"
                  value={patient.age}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Blood Group</InputLabel>
                  <Select
                    labelId="bloodGroup-label"
                    id="bloodGroup"
                    name="bloodGroup"
                    value={patient.bloodGroup}
                    label="Blood Group"
                    onChange={handleInputChange}
                    className="text-left"
                  >
                    <MenuItem value={"A+"}>A+</MenuItem>
                    <MenuItem value={"A-"}>A-</MenuItem>
                    <MenuItem value={"B+"}>B+</MenuItem>
                    <MenuItem value={"B-"}>B-</MenuItem>
                    <MenuItem value={"O+"}>O+</MenuItem>
                    <MenuItem value={"O-"}>O-</MenuItem>
                    <MenuItem value={"AB+"}>AB+</MenuItem>
                    <MenuItem value={"AB-"}>AB-</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={patient.password}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 2 }} />
      </Container>
    </ThemeProvider>
  );
}
