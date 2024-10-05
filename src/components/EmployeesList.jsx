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

  // Función para obtener la lista de empleados desde el backend
  const init = () => {
    employeeService
      .getAll()
      .then((response) => {
        console.log("Mostrando listado de todos los empleados.", response.data);
        setEmployees(response.data); // Almacenamos los empleados en el estado
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todos los empleados.",
          error
        );
      });
  };

  // useEffect para llamar a init al montar el componente
  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <h2>Lista de Empleados</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="employee table">
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
    </div>
  );
};

export default EmployeeList;

