import React, { useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditAppointmentPopup from "./EditAppointment";
import { getAllDoctors } from "../../services/DoctorService";
import {
  format,
  parseISO,
  isBefore,
  isToday,
  differenceInMinutes,
} from "date-fns";
import Swal from "sweetalert2";
import {
  deleteAppointmentById,
  getAllAppointments,
} from "../../services/AppoinmentService";

function ListOfAppointments(props) {
  const { data, setData } = props;
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);
  const [doctorList, setDoctorList] = useState([]);

  const handleEditClick = (appointmentId) => {
    setCurrentAppointmentId(appointmentId);
    setOpenEditModal(true);
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
            const updatedAppointments = data.filter(
              (appointment) => appointment.id !== appointmentId
            );
            setData(updatedAppointments);
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

  useEffect(() => {
    getAllDoctors().then((res) => {
      if (res.status === 200) {
        setDoctorList(res.data);
      }
    });
  }, [openEditModal]);

  const refreshAppointments = async () => {
    await getAllAppointments()
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
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
    <div>
      <TableContainer component={Paper} sx={{ width: "90%", margin: "auto" }}>
        <Table sx={{ minWidth: 750 }} aria-label="appointments table">
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
                Action(s)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((appointment, index) => (
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
                    onClick={() => handleEditClick(appointment.id)}
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

      <EditAppointmentPopup
        open={openEditModal}
        handleClose={() => {
          setOpenEditModal(false);
          refreshAppointments();
        }}
        appointmentId={currentAppointmentId}
        doctorList={doctorList}
      />
    </div>
  );
}

export default ListOfAppointments;
