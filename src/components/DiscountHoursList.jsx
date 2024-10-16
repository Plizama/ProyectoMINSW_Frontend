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
import Box from '@mui/material/Box';

const DiscountHoursList = () => {
  const [rut, setRut] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [discountHoursList, setDiscountHoursList] = useState([]);
  const [message, setMessage] = useState("");

  // Manejo de cambio en los inputs
  const handleRutChange = (event) => {
    setRut(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  // Búsqueda
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

  // Aprobar horas
  const handleApprove = (rut, date) => {
    discountHoursService
      .approveDiscountHours(rut, date)
      .then(() => {
        setMessage("Descuento de horas aprobado correctamente.");
        handleSearchByRutAndMonth();
      })
      .catch(() => {
        setMessage("Error al aprobar descuento de horas.");
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
          Buscar Horas de Descuento por RUT, Mes y Año
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
          onClick={handleSearchByRutAndMonth}
          style={{
            zIndex: 3,
          }}
        >
          Buscar
        </Button>
      </div>
  
      {message && (
        <Alert severity="info" style={{ marginTop: '20px', zIndex: 2 }}>
          {message}
        </Alert>
      )}
  
      {discountHoursList.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
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
