import * as React from "react";
import { useState } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
  addNewAppointment,
  updateAppointmentById,
} from "../../services/AppoinmentService";
import Swal from "sweetalert2";
import { DateTimePicker } from "@mui/x-date-pickers";
import moment from "moment";

export default function NewAppointments({
  patient,
  appointment = null,
  closeModal,
}) {
  const [problemDescription, setProblemDescription] = useState(
    appointment ? appointment.problem : ""
  );
  const [appointmentDate, setAppointmentDate] = useState(
    appointment && appointment.appointmentDate
      ? moment(appointment.appointmentDate)
      : moment()
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const appointmentData = {
      patient,
      problem: problemDescription,
      appointmentDate,
    };

    const actionPromise = appointment
      ? updateAppointmentById(appointment.id, appointmentData) // This function needs to be implemented
      : addNewAppointment(appointmentData);

    actionPromise
      .then((res) => {
        if (res.status === 200) {
          closeModal();
          Swal.fire({
            title: "Success!",
            text: `Your appointment has been ${
              appointment ? "updated" : "booked"
            }.`,
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: `There was a problem ${
              appointment ? "updating" : "booking"
            } your appointment. Please try again.`,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: "There was an error processing your request. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          {appointment ? "Update Appointment" : "New Appointment"}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="problemDescription"
            label="Problem Description"
            name="problemDescription"
            autoComplete="problemDescription"
            autoFocus
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
            multiline
            rows={4}
            sx={{ mb: 4 }}
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              disablePast
              className="w-full"
              label="Appointment Date & Time"
              value={appointmentDate}
              onChange={setAppointmentDate}
              components={{
                textField: ({ inputRef, inputProps, InputProps }) => (
                  <TextField
                    {...inputProps}
                    ref={inputRef}
                    InputProps={InputProps}
                    margin="normal"
                  />
                ),
              }}
            />
          </LocalizationProvider>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {appointment ? "Update" : "Book"} Appointment
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
