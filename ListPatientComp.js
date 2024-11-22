import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePatientById } from "../../services/PatientService";
import Swal from "sweetalert2";

export default function ListOfPatients(props) {
  const { data, setData } = props;

  const handleDeleteClick = (patientId) => {
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
        deletePatientById(patientId)
          .then((res) => {
            if (res.status === 200) {
              const updatedPatients = data.filter(
                (patient) => patient.id !== patientId
              );
              setData(updatedPatients);
              Swal.fire(
                "Deleted!",
                "The patient has been successfully deleted.",
                "success"
              );
            } else {
              Swal.fire("Error!", "Failed to delete the patient.", "error");
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire(
              "Error!",
              "There was a problem deleting the patient.",
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
              Patient Name
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Age
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Gender
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Email
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Contact No.
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Blood Group
            </TableCell>
            <TableCell align="center" sx={{ color: "white" }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {row.patientName}
              </TableCell>
              <TableCell align="center">{row.age}</TableCell>
              <TableCell align="center">{row.gender}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
              <TableCell align="center">{row.contactNo}</TableCell>
              <TableCell align="center">{row.bloodGroup}</TableCell>
              <TableCell align="center">
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteClick(row.id)}
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
