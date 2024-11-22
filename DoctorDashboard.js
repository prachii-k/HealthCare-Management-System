import {
  Button,
  Box,
  Typography,
  Modal,
  Avatar,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { getDoctorByEmail } from "../../services/DoctorService";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { getAppointmentsByDoctorId } from "../../services/AppoinmentService";
import {
  format,
  parseISO,
  isBefore,
  isToday,
  isTomorrow,
  differenceInMinutes,
} from "date-fns";
import AppointmentDetails from "../appointment/AppointmentDetails";

export default function DoctorDashboard() {
  const nav = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [doctor, setDoctor] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);

  useEffect(() => {
    if (!email) {
      nav("/");
    } else {
      getDoctorByEmail(email).then((res) => {
        if (res.status === 200) {
          setDoctor(res.data);
          fetchAppointments(res.data.id);
        }
      });
    }
  }, [nav, email]);

  const fetchAppointments = (doctorId) => {
    getAppointmentsByDoctorId(doctorId)
      .then((res) => {
        if (res.status === 200) {
          setAppointments(res.data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch appointments:", error);
      });
  };

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = (appointment) => {
    setCurrentAppointment(appointment);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setCurrentAppointment(null);
  };

  const getAppointmentStatus = (appointmentDate, prescription) => {
    const today = new Date();
    const dateOfAppointment = parseISO(appointmentDate);
    const minutesAway = differenceInMinutes(dateOfAppointment, today);
    console.log(minutesAway);
    if (isBefore(dateOfAppointment, today)) {
      return prescription ? "Treated" : "Not Treated";
    } else if (isToday(dateOfAppointment)) {
      if (minutesAway <= 60 && minutesAway > 0) {
        return prescription ? "Treated" : "In Progress";
      }
      return "Upcoming";
    } else if (isTomorrow(dateOfAppointment)) {
      return "Upcoming";
    } else {
      return "Scheduled";
    }
  };

  return (
    <div className="dashboard p-4">
      <nav className="flex justify-between items-center">
        <div>
          <img src={logo} alt="hospital-logo" className="w-[80px] h-[70px]" />
        </div>
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variant="text"
            onClick={() => nav("/home")}
            sx={{ textTransform: "none" }}
          >
            Home
          </Button>
          <Button
            variant="text"
            onClick={() => nav("/about")}
            sx={{ textTransform: "none" }}
          >
            About
          </Button>
          <Button
            variant="text"
            onClick={() => nav("/contact")}
            sx={{ textTransform: "none" }}
          >
            Contact Us
          </Button>
          <Avatar
            onClick={handleProfileMenu}
            sx={{ bgcolor: "secondary.main", cursor: "pointer" }}
          >
            <AccountCircleIcon />
          </Avatar>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem disabled>Welcome, {doctor.doctorName}</MenuItem>
            <MenuItem onClick={() => nav("/")}>Logout</MenuItem>
          </Menu>
        </Box>
      </nav>
      <div>
        <Typography variant="h4" component="h1" className="font-bold mt-8">
          Welcome to the Hospital Management Dashboard
        </Typography>
      </div>
      <div className="mt-4">
        <Typography variant="h5" className="">
          Welcome {doctor.doctorName} ({doctor.specialist})
        </Typography>
      </div>
      <div className="apppointments-section mt-5">
        <div className="mt-3">
          <Typography variant="h5" className="">
            Your Appointments
          </Typography>
        </div>
        <div className="mt-4">
          <TableContainer
            component={Paper}
            sx={{ width: "90%", margin: "auto" }}
          >
            <Table sx={{ minWidth: 750 }} aria-label="appointment table">
              <TableHead>
                <TableRow sx={{ bgcolor: "secondary.dark" }}>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Patient Name
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Patient Contact
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Problem(s)
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Prescription
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Appointment Date
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Treatment Status
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((appointment, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      {appointment?.patient?.patientName}
                    </TableCell>
                    <TableCell align="center">
                      {appointment?.patient?.contactNo}
                    </TableCell>
                    <TableCell align="center">{appointment.problem}</TableCell>
                    <TableCell align="center">
                      {appointment.prescription || "No prescription yet"}
                    </TableCell>
                    <TableCell align="center">
                      {appointment.appointmentDate
                        ? format(
                            parseISO(appointment.appointmentDate),
                            "dd/MM/yyyy hh:mm a"
                          )
                        : "Loading..."}
                    </TableCell>
                    <TableCell align="center">
                      {appointment.appointmentDate
                        ? getAppointmentStatus(
                            appointment.appointmentDate,
                            appointment.prescription
                          )
                        : "Loading..."}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleOpenModal(appointment)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Modal
        className="rounded"
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: "5px", right: "5px" }}
            onClick={handleCloseModal}
          >
            <CloseIcon />
          </IconButton>
          {currentAppointment && (
            <AppointmentDetails
              open={open}
              appointment={currentAppointment}
              onClose={handleCloseModal}
              refreshAppointments={() => fetchAppointments(doctor.id)}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}
