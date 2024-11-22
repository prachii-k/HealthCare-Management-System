import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/admin";

//  export const AdminService = {
//     addDoctor: async (doctorData) => {
//         try {
//             const response = await axios.post(`${API_BASE_URL}/doctors`, doctorData);
//             return response.data;
//         } catch (error) {
//             console.error('Error adding doctor:', error);
//             throw error;
//         }
//     },

//     // Function to update an existing doctor's information
//     updateDoctor: async (doctorId, updatedData) => {
//         try {
//             const response = await axios.put(`${API_BASE_URL}/doctors/${doctorId}`, updatedData);
//             return response.data;
//         } catch (error) {
//             console.error('Error updating doctor:', error);
//             throw error;
//         }
//     },

//     deleteDoctor: async (doctorId) => {
//         try {
//             const response = await axios.delete(`${API_BASE_URL}/doctors/${doctorId}`);
//             return response.data;
//         } catch (error) {
//             console.error('Error deleting doctor:', error);
//             throw error;
//         }
//     },

// };

export const adminLogin = (user) => {
  return axios.post(API_BASE_URL + "/login", user);
};
export const adminRegister = (admin) => {
  return axios.post(API_BASE_URL + "/register", admin);
};
