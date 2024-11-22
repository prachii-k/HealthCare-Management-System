import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import Swal from "sweetalert2";
import { updateAppointmentPrescription } from "../../services/AppoinmentService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AppointmentDetails = ({
  open,
  onClose,
  appointment,
  refreshAppointments,
}) => {
  const [appointmentDetails, setAppointmentDetails] = useState(appointment);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (newValue) => {
    if (newValue.isValid()) {
      setAppointmentDetails((prev) => ({
        ...prev,
        appointmentDate: newValue.toISOString(),
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await updateAppointmentPrescription(
        appointmentDetails.id,
        appointmentDetails
      );
      if (res.status === 200) {
        Swal.fire(
          "Success!",
          "Appointment details updated successfully",
          "success"
        );
        refreshAppointments();
        onClose();
      } else {
        Swal.fire("Error!", "Failed to update appointment details", "error");
      }
    } catch (error) {
      console.error("Failed to update appointment:", error);
      Swal.fire(
        "Error!",
        "Failed to update appointment details due to network error",
        "error"
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={(event) => {
        event.stopPropagation();
        onClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="text-center"
          sx={{ mb: 2 }}
        >
          Appointment Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            label="Problem"
            name="problem"
            value={appointmentDetails.problem || ""}
            onChange={handleChange}
            multiline
            rows={2}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            autoFocus
            label="Prescription"
            name="prescription"
            value={appointmentDetails.prescription || ""}
            onChange={handleChange}
            multiline
            rows={2}
            required
            sx={{ mb: 3 }}
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              disablePast
              className="w-full"
              label="Appointment Date"
              value={moment(appointmentDetails.appointmentDate)}
              onChange={handleDateChange}
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
            Update Details
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AppointmentDetails;
