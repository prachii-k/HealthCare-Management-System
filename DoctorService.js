import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/doctors";
// const DoctorService = {
//     getAllDoctors: async () => {
//         try {
//             const response = await fetch(`${API_BASE_URL}`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch doctors');
//             }
//             const data = await response.json();
//             return data;
//         } catch (error) {
//             console.error('Error fetching doctors:', error);
//             throw error;
//         }
//     },

//     addDoctor: async (doctorData) => {
//         try {
//             const response = await axios.post(`${API_BASE_URL}`, doctorData);
//             return response.data;
//         } catch (error) {
//             console.error('Error adding doctor:', error);
//             throw error;
//         }
//     },

//     // Function to fetch a single doctor by ID
//     getDoctorById: async (doctorId) => {
//         try {
//             const response = await fetch(`${API_BASE_URL}/${doctorId}`);
//             if (!response.ok) {
//                 throw new Error(`Failed to fetch doctor with ID: ${doctorId}`);
//             }
//             const data = await response.json();
//             return data;
//         } catch (error) {
//             console.error(`Error fetching doctor with ID ${doctorId}:`, error);
//             throw error; // Rethrow the error to handle it in the component
//         }
//     },

//     // Function to update a doctor's information
//     updateDoctor: async (doctorId, updatedData) => {
//         try {
//             const response = await fetch(`${API_BASE_URL}/${doctorId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(updatedData)
//             });
//             const data = await response.json();
//             return data;
//         } catch (error) {
//             console.error('Error updating doctor:', error);
//             throw error;
//         }
//     },

// };

// export default DoctorService;
export const doctorLogin = (user) => {
  return axios.post(API_BASE_URL + "/login", user);
};
export const doctorRegister = (doctor) => {
  return axios.post(API_BASE_URL + "/register", doctor);
};

export const getAllDoctors = () => {
  return axios.get(API_BASE_URL + "/allDoctors")
}

export const getDoctorByEmail = (email) => {
  return axios.get(API_BASE_URL + "/" + email);
};

export const deleteDoctorById = (doctorId) => {
  return axios.delete(API_BASE_URL + "/" + doctorId);
};
