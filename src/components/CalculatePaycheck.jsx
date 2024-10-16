import React, { useState } from "react";
import paycheckService from "../services/paycheck.service";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Box from '@mui/material/Box';

const CalculatePaycheck = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");

  // ingresar mes
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  // Ingresar año
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  // Calcular las nóminas por mes y año
  const handleCalculatePaychecks = () => {
    if (!month || !year) {
      setMessage("Por favor ingresa el mes y el año.");
      return;
    }

    paycheckService
      .calculatePaychecks(year, month)
      .then(() => {
        setMessage("Planillas de sueldo generadas correctamente.");
      })
      .catch((error) => {
        setMessage("Error al generar las planillas de sueldo.");
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
          Calcular Planillas de Sueldo Mensual
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
        {/* Menú desplegable de meses */}
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

        {/* Ingresar el año */}
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
          onClick={handleCalculatePaychecks}
          disabled={!month || !year}
          style={{
            zIndex: 3,
          }}
        >
          {month ? `Calcular Nómina` : "Calcular Nómina"}
        </Button>
      </div>

      {message && (
        <Alert severity="info" style={{ marginTop: '20px', zIndex: 2 }}>
          {message}
        </Alert>
      )}
    </div>
  );
};

export default CalculatePaycheck;