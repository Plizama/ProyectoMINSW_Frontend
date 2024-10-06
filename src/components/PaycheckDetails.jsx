import React, { useState } from "react";
import paycheckService from "../services/paycheck.service";
import employeeService from "../services/employee.service";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const PaycheckDetails = () => {
  const [rut, setRut] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [paycheck, setPaycheck] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [yearsOfService, setYearsOfService] = useState(null);
  const [message, setMessage] = useState("");

  // Función para manejar el cambio en el RUT
  const handleRutChange = (event) => {
    setRut(event.target.value);
  };

  // Función para manejar el cambio en el mes
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  // Función para manejar el cambio en el año
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  // Función para obtener los detalles del paycheck y del employee
  const handleSearchPaycheck = () => {
    if (!rut || !month || !year) {
      setMessage("Por favor ingresa el RUT, mes y año.");
      return;
    }

    // Obtener detalles del empleado
    employeeService
      .getEmployeeByRut(rut)
      .then((response) => {
        setEmployee(response.data);
        setMessage("");
      })
      .catch((error) => {
        setEmployee(null);
        setMessage("Error al buscar los detalles del empleado.");
      });

    // Obtener detalles del paycheck
    paycheckService
      .getPaycheckDetails(rut, year, month)
      .then((response) => {
        setPaycheck(response.data);
        setMessage("");
      })
      .catch((error) => {
        setPaycheck(null);
        if (error.response && error.response.status === 404) {
          setMessage("No se encontró la nómina para el RUT, mes y año proporcionados.");
        } else {
          setMessage("Error al buscar los detalles de la nómina.");
        }
      });

    // Obtener los años de servicio desde el backend
    employeeService
      .getYearsOfService(rut)
      .then((response) => {
        setYearsOfService(response.data);
      })
      .catch((error) => {
        setYearsOfService(null);
        setMessage("Error al calcular los años de servicio.");
      });
  };

  return (
    <div>
      <Typography variant="h4">Planilla de sueldo por empleado</Typography>

      <input
        type="text"
        placeholder="Ingresa el RUT"
        value={rut}
        onChange={handleRutChange}
        style={{ marginRight: "10px" }}
      />

      {/* Menú desplegable para seleccionar el mes */}
      <select value={month} onChange={handleMonthChange} style={{ marginRight: "10px" }}>
        <option value="">Seleccionar Mes</option>
        <option value="1">Enero</option>
        <option value="2">Febrero</option>
        <option value="3">Marzo</option>
        <option value="4">Abril</option>
        <option value="5">Mayo</option>
        <option value="6">Junio</option>
        <option value="7">Julio</option>
        <option value="8">Agosto</option>
        <option value="9">Septiembre</option>
        <option value="10">Octubre</option>
        <option value="11">Noviembre</option>
        <option value="12">Diciembre</option>
      </select>

      <input
        type="text"
        placeholder="Año"
        value={year}
        onChange={handleYearChange}
        style={{ marginRight: "10px" }}
      />

      <Button variant="contained" color="primary" onClick={handleSearchPaycheck}>
        Buscar Nómina
      </Button>

      {message && (
        <Alert severity="info" style={{ marginTop: "20px" }}>
          {message}
        </Alert>
      )}

      {/* Mostrar la tabla solo si se ha encontrado la nómina y los detalles del empleado */}
      {paycheck && employee && yearsOfService !== null && (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell><strong>RUT</strong></TableCell>
                <TableCell>{employee.rut}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Nombre Completo</strong></TableCell>
                <TableCell>{employee.first_name} {employee.last_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Categoría</strong></TableCell>
                <TableCell>{employee.category}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Años de Servicio</strong></TableCell>
                <TableCell>{yearsOfService}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Año</strong></TableCell>
                <TableCell>{paycheck.year}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Mes</strong></TableCell>
                <TableCell>{paycheck.month}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Salario Fijo</strong></TableCell>
                <TableCell>{paycheck.monthlySalary}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Bonificación Años de Servicio</strong></TableCell>
                <TableCell>{paycheck.salaryBonus}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Descuento por Atrasos</strong></TableCell>
                <TableCell>{paycheck.discountHours}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Bonificación Horas Extra</strong></TableCell>
                <TableCell>{paycheck.extraHoursBonus}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Salario Bruto</strong></TableCell>
                <TableCell>{paycheck.grossSalary}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Descuento Seguridad Social</strong></TableCell>
                <TableCell>{paycheck.socialSecurityDiscount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Descuento Salud</strong></TableCell>
                <TableCell>{paycheck.healthDiscount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Salario Líquido</strong></TableCell>
                <TableCell>{paycheck.totalSalary}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default PaycheckDetails;

