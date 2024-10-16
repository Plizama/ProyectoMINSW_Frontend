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
import Box from '@mui/material/Box';

const PaycheckDetails = () => {
  const [rut, setRut] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [paycheck, setPaycheck] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [yearsOfService, setYearsOfService] = useState(null);
  const [message, setMessage] = useState("");

  // Ingresar/cambiar el RUT
  const handleRutChange = (event) => {
    setRut(event.target.value);
  };

  // Ingresar/cambiar el mes
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  // Ingresar/cambiar el año
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  // Obtener los detalles del pago y del empleado
  const handleSearchPaycheck = () => {
    if (!rut || !month || !year) {
      setMessage("Por favor ingresa el RUT, mes y año.");
      return;
    }

    // Empleado
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

    // Pago
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

    // Años de servicio
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '40px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Planilla de sueldo por empleado
        </Typography>
      </Box>

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '10px',
          backgroundColor: '#fff',
        }}
      >
        <input
          type="text"
          placeholder="Ingresa el RUT"
          value={rut}
          onChange={handleRutChange}
          style={{
            marginRight: '10px',
            zIndex: 3,
            padding: '5px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />

        {/* Menú desplegable para seleccionar el mes */}
        <select
          value={month}
          onChange={handleMonthChange}
          style={{
            marginRight: '10px',
            zIndex: 3,
            padding: '5px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        >
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
          style={{
            marginRight: '10px',
            zIndex: 3,
            padding: '5px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchPaycheck}
          style={{
            zIndex: 3,
          }}
        >
          Buscar Nómina
        </Button>
      </div>

      {message && (
        <Alert severity="info" style={{ marginTop: '20px', zIndex: 2 }}>
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