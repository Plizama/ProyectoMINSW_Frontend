import React, { useState } from "react";
import paycheckService from "../services/paycheck.service";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

const CalculatePaycheck = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");

  // Manejar cambios en el input del mes (usando <select>)
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  // Manejar cambios en el input del año
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  // Función para calcular las nóminas por mes y año
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
      <Typography variant="h4">Calcular Planillas de Sueldo Mensual.</Typography>

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
        onClick={handleCalculatePaychecks}
        disabled={!month || !year} // Deshabilitar si no se ingresa mes y año
      >
        {month ? `Calcular Nómina` : "Calcular Nómina"}
      </Button>

      {message && (
        <Alert severity="info" style={{ marginTop: "20px" }}>
          {message}
        </Alert>
      )}
    </div>
  );
};

export default CalculatePaycheck;

