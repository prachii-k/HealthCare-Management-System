import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import moment from "moment";
import {
  assignDoctor,
  getAppointmentById,
} from "../../services/AppoinmentService";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Swal from "sweetalert2";

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

const EditAppointmentPopup = ({
  open,
  handleClose,
  appointmentId,
  doctorList,
}) => {
  const [appointmentDetails, setAppointmentDetails] = useState({});

  useEffect(() => {
    if (appointmentId) {
      const fetchAppointmentDetails = async () => {
        const res = await getAppointmentById(appointmentId);
        if (res.status === 200) {
          setAppointmentDetails(res.data);
        }
      };
      fetchAppointmentDetails();
    }
  }, [appointmentId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "assignedDoctorId") {
      const selectedDoctor = doctorList.find((doctor) => doctor.id === value);
      setAppointmentDetails((prev) => ({
        ...prev,
        doctor: selectedDoctor,
      }));
    }
  };

  const handleDateChange = (newValue) => {
    setAppointmentDetails((prev) => ({
      ...prev,
      appointmentDate: newValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await assignDoctor(
      appointmentDetails.id,
      appointmentDetails.doctor
    );
    if (res.status === 200) {
      Swal.fire({
        title: "Success!",
        text:
          "Doctor Assigned to Patient: " +
          (appointmentDetails.patient?.patientName || "Unknown"),
        icon: "success",
        confirmButtonText: "OK",
      });
      handleClose();
    } else {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          className="text-center"
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 2 }}
        >
          Edit Appointment
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Patient Name"
              name="patientName"
              value={appointmentDetails.patient?.patientName || ""} // Handle potential undefined values
              onChange={handleChange}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>

          <Box mb={2}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Problem"
              name="problem"
              value={appointmentDetails.problem}
              onChange={handleChange}
              multiline
              rows={3}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>

          <Box mb={1}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateTimePicker
                readOnly
                className="w-full"
                label="Appointment Date"
                value={moment(appointmentDetails.appointmentDate)}
                onChange={handleDateChange} // Use the new handler here
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
          </Box>

          <Box>
            <FormControl fullWidth margin="normal">
              <InputLabel id="doctor-select-label" required>
                Assign Doctor
              </InputLabel>
              <Select
                required
                label="Assign Doctor"
                labelId="doctor-select-label"
                name="assignedDoctorId"
                value={appointmentDetails.doctor?.id || ""}
                onChange={handleChange}
              >
                {doctorList.map((doctor, index) => (
                  <MenuItem key={index} value={doctor.id}>
                    {doctor.doctorName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Appointment
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditAppointmentPopup;
