import axios from "axios";
const API_BASE_URL = "http://localhost:8080/api/patients"; // Assuming the backend API is served at this URL

// const PatientService = {
//     // Function to fetch all patients
//     getAllPatients: async () => {
//         try {
//             const response = await fetch(`${API_BASE_URL}/patients`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch patients');
//             }
//             const data = await response.json();
//             return data;
//         } catch (error) {
//             console.error('Error fetching patients:', error);
//             throw error; // Rethrow the error to handle it in the component
//         }
//     },

//     // Function to fetch a single patient by ID
//     getPatientById: async (patientId) => {
//         try {
//             const response = await fetch(`${API_BASE_URL}/patients/${patientId}`);
//             if (!response.ok) {
//                 throw new Error(`Failed to fetch patient with ID: ${patientId}`);
//             }
//             const data = await response.json();
//             return data;
//         } catch (error) {
//             console.error(`Error fetching patient with ID ${patientId}:`, error);
//             throw error; // Rethrow the error to handle it in the component
//         }
//     },

//     // Function to update a patient's information
//     updatePatient: async (patientId, updatedData) => {
//         try {
//             const response = await fetch(`${API_BASE_URL}/patients/${patientId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(updatedData)
//             });
//             const data = await response.json();
//             return data;
//         } catch (error) {
//             console.error('Error updating patient:', error);
//             throw error; // Rethrow the error to handle it in the component
//         }
//     },

//     // Function to delete a patient
//     deletePatient: async (patientId) => {
//         try {
//             const response = await fetch(`${API_BASE_URL}/patients/${patientId}`, {
//                 method: 'DELETE'
//             });
//             if (!response.ok) {
//                 throw new Error(`Failed to delete patient with ID: ${patientId}`);
//             }
//             const data = await response.json();
//             return data;
//         } catch (error) {
//             console.error(`Error deleting patient with ID ${patientId}:`, error);
//             throw error; // Rethrow the error to handle it in the component
//         }
//     },

//     // Function to add a new patient
//     addPatient: async (patientData) => {
//         try {
//             const response = await fetch(`${API_BASE_URL}/patients`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(patientData)
//             });
//             const data = await response.json();
//             return data;
//         } catch (error) {
//             console.error('Error adding patient:', error);
//             throw error; // Rethrow the error to handle it in the component
//         }
//     }
// };

// export default PatientService;
export const patientLogin = (user) => {
  return axios.post(API_BASE_URL + "/login", user);
};
export const patientRegister = (patient) => {
  return axios.post(API_BASE_URL + "/register", patient);
};

export const getAllPatients = () => {
  return axios.get(API_BASE_URL + "/allPatients");
};

export const getPatientByEmail = (email) => {
  return axios.get(API_BASE_URL + "/" + email);
};

export const deletePatientById = (patientId) => {
  return axios.delete(API_BASE_URL + "/" + patientId);
};
