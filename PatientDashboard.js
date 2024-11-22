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
} from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { getPatientByEmail } from "../../services/PatientService";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NewAppointments from "../appointment/NewAppointment";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import Copyright from "../commons/FooterComp";
import {
  deleteAppointmentById,
  getAppointmentsByPatientId,
} from "../../services/AppoinmentService";
import {
  format,
  parseISO,
  isBefore,
  isToday,
  differenceInMinutes,
} from "date-fns";
import Swal from "sweetalert2";

export default function PatientDashboard() {
  const location = useLocation();
  const email = location.state?.email;
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [patient, setPatient] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentAppointment, setCurrentAppointment] = useState(null);

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!email) {
      nav("/");
    } else {
      getPatientByEmail(email).then((res) => {
        if (res.status === 200) {
          setPatient(res.data);
          fetchAppointments(res.data.id);
        }
      });
    }
  }, [email, nav, open]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCurrentAppointment(null);
  };

  const fetchAppointments = (id) => {
    getAppointmentsByPatientId(id)
      .then((appointmentsResponse) => {
        if (appointmentsResponse.status === 200) {
          setAppointments(appointmentsResponse.data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch appointments:", error);
      });
  };
  const handleEditClick = (appointment) => {
    handleOpen();
    setCurrentAppointment(appointment);
  };

  const handleDeleteClick = (appointmentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAppointmentById(appointmentId).then((response) => {
          if (response.status === 200) {
            const updatedAppointments = appointments.filter(
              (appointment) => appointment.id !== appointmentId
            );
            setAppointments(updatedAppointments);
            Swal.fire(
              "Deleted!",
              "The appointment has been deleted.",
              "success"
            );
          } else {
            Swal.fire("Error!", "Failed to delete the appointment.", "error");
          }
        });
      }
    });
  };

  const getAppointmentStatus = (appointmentDate, prescription, doctor) => {
    const today = new Date();
    const dateOfAppointment = parseISO(appointmentDate);

    if (isBefore(dateOfAppointment, today)) {
      return doctor
        ? prescription
          ? "Treated"
          : "Not Treated"
        : "No Doctor was alloted";
    } else if (isToday(dateOfAppointment)) {
      const minutesAway = differenceInMinutes(dateOfAppointment, today);

      if (minutesAway <= 60 && minutesAway > 0) {
        return doctor ? "In Progress" : "Doctor not allotted yet";
      } else if (minutesAway <= 0) {
        return doctor
          ? prescription
            ? "Treated"
            : "In Progress"
          : "Doctor not allotted yet";
      } else {
        return "Upcoming";
      }
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
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "none" }}
            onClick={handleOpen}
          >
            Take Appointment
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
            <MenuItem disabled>Welcome, {patient.patientName}</MenuItem>
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
          Welcome {patient.patientName}
        </Typography>
      </div>
      <div className="appointments-section mt-4">
        <div className="mt-2">
          <Typography variant="h5">Your Appointments</Typography>
        </div>
        <div className="mt-4">
          <TableContainer
            component={Paper}
            sx={{ width: "90%", margin: "auto" }}
          >
            <Table sx={{ minWidth: 750 }} aria-label="appointments table">
              <TableHead>
                <TableRow sx={{ bgcolor: "secondary.dark" }}>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Name
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Contact
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Problem(s)
                  </TableCell>
                  <TableCell align="center" sx={{ color: "white" }}>
                    Doctor Name
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
                    <TableCell align="center" component="th" scope="row">
                      {appointment.patient?.patientName}
                    </TableCell>
                    <TableCell align="center">
                      {appointment.patient?.contactNo}
                    </TableCell>
                    <TableCell align="center">{appointment.problem}</TableCell>
                    <TableCell align="center">
                      {appointment.doctor?.doctorName || "Doctor not assigned"}
                    </TableCell>
                    <TableCell align="center">
                      {appointment.doctor?.doctorName
                        ? appointment.prescription || "No prescription yet"
                        : "Doctor not assigned"}
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
                            appointment.prescription,
                            appointment.doctor
                          )
                        : "Loading..."}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEditClick(appointment)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteClick(appointment.id)}
                      >
                        <DeleteIcon />
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
        open={open}
        onClose={handleClose}
        aria-labelledby="new-appointment-modal"
        aria-describedby="new-appointment-modal-form"
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
            p: 3,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <NewAppointments
            patient={patient}
            appointment={currentAppointment}
            closeModal={handleClose}
          />
        </Box>
      </Modal>

      <Copyright sx={{ mt: 8, mb: 4 }} />
    </div>
  );
}
