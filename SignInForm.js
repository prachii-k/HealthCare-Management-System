import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { adminLogin } from "../../services/AdminService";
import { doctorLogin } from "../../services/DoctorService";
import { patientLogin } from "../../services/PatientService";
import { useNavigate } from "react-router-dom";
import Copyright from "./FooterComp";
import Swal from "sweetalert2";

const defaultTheme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const nav = useNavigate();

  const showAlert = (title, text, icon, callback) => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed && typeof callback === "function") {
        callback();
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let loginPromise;

    switch (role) {
      case "admin":
        loginPromise = adminLogin({ email, password });
        break;
      case "doctor":
        loginPromise = doctorLogin({ email, password });
        break;
      case "patient":
        loginPromise = patientLogin({ email, password });
        break;
      default:
        return;
    }

    if (loginPromise) {
      loginPromise
        .then((res) => {
          if (res.data === true) {
            const successMessage = "Login successful!";
            showAlert("Success!", successMessage, "success", () => {
              // Updated paths and state passing logic to include the doctor role
              let navigatePath = "/dashboard";
              let state = undefined;

              if (role === "patient") {
                navigatePath = "/patient/patient-dashboard";
                state = { email };
              } else if (role === "doctor") {
                navigatePath = "/doctor/doctor-dashboard";
                state = { email };
              }

              nav(navigatePath, { state });
            });
          } else {
            setErrorMessage("Email or password is incorrect");
          }
        })
        .catch((error) => {
          showAlert(
            "Error!",
            "An error occurred. Please try again later.",
            "error"
          );
          console.log("error:", error);
        });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {errorMessage && (
              <Typography color="error" textAlign="center">
                {errorMessage}
              </Typography>
            )}
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-select-label" required>
                Role
              </InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="doctor">Doctor</MenuItem>
                <MenuItem value="patient">Patient</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs className="text-left">
                <Link href="#" variant="body2" underline="none">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/patient/register" variant="body2" underline="none">
                  {"New patient? Register here."}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
