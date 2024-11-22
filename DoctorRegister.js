// import React, { useState } from "react";
// import { TextField, Button } from "@mui/material";
// import { doctorRegister } from "../../services/DoctorService";
// import { useNavigate } from "react-router-dom";

// function DoctorRegister() {
//   const [doctorInfo, setDoctorInfo] = useState({
//     name: "",
//     specialization: "",
//     email: "",
//     contactNo: "",
//     drname: "",
//     gender: "",
//     password: "",
//     experience: "",
//     age: "",
//   });
//   const navigate = useNavigate();

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setDoctorInfo((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     doctorRegister(doctorInfo).then((res) => {
//       console.log(res.data);
//       navigate("/");
//     });
//     console.log("Doctor Info:", doctorInfo);
//   };

//   return (
//     <div className="doctor-register">
//       <h2>Doctor Registration</h2>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Name"
//           variant="outlined"
//           fullWidth
//           name="name"
//           value={doctorInfo.name}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Specialization"
//           variant="outlined"
//           fullWidth
//           name="specialization"
//           value={doctorInfo.specialization}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Email"
//           variant="outlined"
//           fullWidth
//           name="email"
//           value={doctorInfo.email}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Contact Number"
//           variant="outlined"
//           fullWidth
//           name="contactNo"
//           value={doctorInfo.contactNo}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Doctor Name"
//           variant="outlined"
//           fullWidth
//           name="drname"
//           value={doctorInfo.drname}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Gender"
//           variant="outlined"
//           fullWidth
//           name="gender"
//           value={doctorInfo.gender}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Password"
//           variant="outlined"
//           fullWidth
//           name="password"
//           value={doctorInfo.password}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Experience"
//           variant="outlined"
//           fullWidth
//           name="experience"
//           value={doctorInfo.experience}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Age"
//           variant="outlined"
//           fullWidth
//           name="age"
//           value={doctorInfo.age}
//           onChange={handleChange}
//         />
//         <Button variant="contained" color="primary" type="submit">
//           Register
//         </Button>
//       </form>
//     </div>
//   );
// }

// export default DoctorRegister;

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
import { doctorRegister } from "../../services/DoctorService";
import Copyright from "../commons/FooterComp";
import Swal from "sweetalert2";

const defaultTheme = createTheme();

export default function DoctorRegister() {
  const nav = useNavigate();

  const [doctor, setDoctor] = useState({
    doctorName: "",
    email: "",
    gender: "",
    password: "",
    specialist: "",
    contactNo: "",
    experience: 0,
    age: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    doctorRegister(doctor)
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'The doctor has been successfully registered!',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          nav("/dashboard"); // Navigate after confirmation
        }
      });
    })
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'Failed to register the doctor. Please try again!',
        confirmButtonText: 'OK'
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
            Register Doctor
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
                  autoComplete="doctorName"
                  name="doctorName"
                  required
                  fullWidth
                  id="doctorName"
                  label="Doctor Name"
                  autoFocus
                  value={doctor.doctorName}
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
                  value={doctor.email}
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
                  value={doctor.contactNo}
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
                    value={doctor.gender}
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
                  value={doctor.age}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="specialist"
                  label="Specialist"
                  name="specialist"
                  autoComplete="specialist"
                  value={doctor.specialist}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="experience"
                  label="Experience (Years)"
                  name="experience"
                  autoComplete="experience"
                  type="number"
                  value={doctor.experience}
                  onChange={handleInputChange}
                />
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
                  value={doctor.password}
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
              Register
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 2 }} />
      </Container>
    </ThemeProvider>
  );
}
