import axios from "axios";

const BASE_URL = "http://localhost:8080/api/appointment";

export const addNewAppointment = async (appointment) => {
  return await axios.post(BASE_URL, appointment);
};

export const getAllAppointments = async () => {
  return await axios.get(BASE_URL);
};

export const getAppointmentById = async (id) => {
  return await axios.get(BASE_URL + "/" + id);
};

export const assignDoctor = async (id, doctor) => {
  return await axios.put(BASE_URL + "/admin/assign/doctor/" + id, doctor);
};

export const deleteAppointmentById = async (id) => {
  return await axios.delete(BASE_URL + "/deleteAppointment/" + id);
};

export const getAppointmentsByPatientId = async (patientId) => {
  return await axios.get(BASE_URL + "/patient/" + patientId);
};

export const updateAppointmentById = (id, appointmentData) => {
  return axios.put(BASE_URL + "/updateAppointmentById/" + id, appointmentData);
};

export const getAppointmentsByDoctorId = async (doctorId) => {
  return await axios.get(BASE_URL + "/doctor/" + doctorId);
};

export const updateAppointmentPrescription = (id, appointment) => {
  return axios.put(BASE_URL + "/updateAppointmentPrescription/" + id, appointment);
};
