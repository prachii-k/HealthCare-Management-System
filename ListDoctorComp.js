// import React from "react";
// import { useState, useEffect } from "react";

// import { useNavigate } from "react-router-dom";

// function ListOfDoctors() {
//   //     const[employees,setEmployees]=useState(
//   //         [
//   //             {id:123,firstName:"Prachi",lastName:"Kadam",email:"prachi@gmail.com"},
//   //             {id:323,firstName:"nikita",lastName:"jadhav",email:"nikki@gmail.com"}

//   //         ]
//   //     );

//   //     useEffect(()=>{
//   //         getAllEmployees();
//   //     },[]);
//   //     const getAllEmployees=()=>{
//   //         getEmployee()
//   //         .then((response)=>{
//   //             console.log(response.data);
//   //             setEmployees(response.data);
//   //         }).catch(error=>{
//   //             console.log(error)
//   //         });
//   //     };
//   //     const nav= useNavigate();
//   //    const addNewEmployee = () =>{
//   //     nav('/add-employee');
//   //    }
//   //    const updateEmployee=(id)=>{
//   //     nav(`/edit-employee/${id}`);
//   //    }

//   //    const RemoveEmployee=(id)=>{
//   //     console.log(id);
//   //     deleteEmployee(id).then((res)=>{
//   //         getAllEmployees();

//   //     }).catch((error)=>{
//   //         console.log(error);
//   //     })
//   //    }
//   return (
//     <div className="container">
//       Hello Doctor
//       {/* <h2>List of All Employee</h2>
//          <button className="btn btn-primary mb=2" onClick={addNewEmployee}>Add Employee</button>
//          <table className="table table-striped table-bordered">

//              <thead>
//                  <tr>
//                      <th>Emp id</th>
//                      <th>Emp First Name</th>
//                      <th>Emp Last Name</th>
//                      <th>Email</th>
//                      <th>Action</th>
//                  </tr>
//              </thead>
//              <tbody>
//                  {
//                      employees.map(emp=>

//                          <tr key={emp.id}>
//                              <td>{emp.id}</td>
//                              <td>{emp.firstName}</td>
//                              <td>{emp.lastName}</td>
//                              <td>{emp.email}</td>
//                              <td>
//                                 <button className="btn btn-info" onClick={()=>updateEmployee(emp.id)}>update</button>
//                                 <button className="btn btn-danger" onClick={()=>RemoveEmployee(emp.id)}>delete</button>
//                              </td>
//                          </tr>
//                          )
//                  }
//              </tbody>
//          </table> */}
//     </div>
//   );
// }
// export default ListOfDoctors;
import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoctorById } from "../../services/DoctorService";
import Swal from "sweetalert2";

function ListOfDoctors(props) {
  const { data, setData } = props;

  const handleDeleteClick = (doctorId) => {
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
        deleteDoctorById(doctorId)
          .then((res) => {
            if (res.status === 200) {
              const updatedDoctors = data.filter(
                (doctor) => doctor.id !== doctorId
              );
              setData(updatedDoctors);
              Swal.fire(
                "Deleted!",
                "The doctor has been successfully deleted.",
                "success"
              );
            } else {
              Swal.fire("Error!", "Failed to delete the doctor.", "error");
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire(
              "Error!",
              "There was a problem deleting the doctor.",
              "error"
            );
          });
      }
    });
  };

  return (
    <TableContainer component={Paper} sx={{ width: "70%", margin: "auto" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ bgcolor: "secondary.dark" }}>
            <TableCell align="center" sx={{ color: "white" }}>
              Doctor Name
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Email
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Contact No.
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Specialist
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Experience
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((doctor, index) => (
            <TableRow key={index}>
              <TableCell align="center" component="th" scope="row">
                {doctor.doctorName}
              </TableCell>
              <TableCell align="center">{doctor.email}</TableCell>
              <TableCell align="center">{doctor.contactNo}</TableCell>
              <TableCell align="center">{doctor.specialist}</TableCell>
              <TableCell align="center">{doctor.experience}</TableCell>
              <TableCell align="center">
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteClick(doctor.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListOfDoctors;
