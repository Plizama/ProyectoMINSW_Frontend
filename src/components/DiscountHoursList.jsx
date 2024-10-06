import React, { useState } from "react";
import discountHoursService from "../services/discountHours.service";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const DiscountHoursList = () => {
  const [rut, setRut] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [discountHoursList, setDiscountHoursList] = useState([]);
  const [message, setMessage] = useState("");

  // Función para manejar el cambio de valor del RUT
  const handleRutChange = (event) => {
    setRut(event.target.value);
  };

  // Función para manejar el cambio de valor del mes
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  // Función para manejar el cambio de valor del año
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  // Función para obtener las horas de descuento por RUT, mes y año
  const handleSearchByRutAndMonth = () => {
    if (!rut || !month || !year) {
      setMessage("Por favor ingrese el RUT, mes y año.");
      return;
    }

    discountHoursService
      .getByRutAndMonth(rut, month, year)
      .then((response) => {
        setDiscountHoursList(response.data);
        setMessage("");
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setMessage("No se encontraron registros para el RUT proporcionado.");
        } else {
          setMessage("Ocurrió un error al buscar los descuentos de horas.");
        }
        setDiscountHoursList([]);
      });
  };

  // Función para aprobar una hora de descuento
  const handleApprove = (rut, date) => {
    discountHoursService
      .approveDiscountHours(rut, date)
      .then(() => {
        setMessage("Descuento de horas aprobado correctamente.");
        // Actualizar el listado después de aprobar
        handleSearchByRutAndMonth();
      })
      .catch(() => {
        setMessage("Error al aprobar descuento de horas.");
      });
  };

  return (
    <div>
      <Typography variant="h4">Buscar Horas de Descuento por RUT, Mes y Año</Typography>

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

      {/* Campo de texto para ingresar el año */}
      <input
        type="text"
        placeholder="Año"
        value={year}
        onChange={handleYearChange}
        style={{ marginRight: "10px" }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSearchByRutAndMonth}
      >
        Buscar
      </Button>

      {message && (
        <Alert severity="info" style={{ marginTop: "20px" }}>
          {message}
        </Alert>
      )}

      {/* Mostrar la tabla solo si hay datos */}
      {discountHoursList.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>RUT</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Horas de Descuento</TableCell>
                <TableCell>Aprobación</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {discountHoursList.map((discountHours) => (
                <TableRow key={discountHours.id}>
                  <TableCell>{discountHours.id}</TableCell>
                  <TableCell>{discountHours.rut}</TableCell>
                  <TableCell>{new Date(discountHours.date).toLocaleDateString()}</TableCell>
                  <TableCell>{discountHours.numDiscountHours}</TableCell>
                  <TableCell>
                    {discountHours.approval ? (
                      "Aprobado"
                    ) : (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleApprove(discountHours.rut, discountHours.date)}
                      >
                        Aprobar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default DiscountHoursList;

