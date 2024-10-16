import { useEffect, useState } from "react";
import employeeService from "../services/employee.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  // Obtener lista de empleados
  const init = () => {
    employeeService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todos los empleados.", response.data);
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todos los empleados.",
          error
        );
      });
  };

  useEffect(() => {
    init();
  }, []);

  return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>RUT</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Fecha de Registro</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.rut}</TableCell>
                <TableCell>{employee.first_name}</TableCell>
                <TableCell>{employee.last_name}</TableCell>
                <TableCell>{employee.category}</TableCell>
                <TableCell>
                  {new Date(employee.registration_date).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default EmployeeList;

