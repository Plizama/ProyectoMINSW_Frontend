import React, { useState } from "react";
import accessControlService from "../services/access_control_system.service";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Box from '@mui/material/Box'; // Usamos Box de Material UI para manejar estilos de forma flexible

const LoadAccessControl = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // Maneja la selección de archivo
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Maneja la carga del archivo
  const handleFileUpload = () => {
    if (!file) {
      setMessage("Por favor, selecciona un archivo.");
      return;
    }

    accessControlService.uploadFile(file)
      .then(() => {
        setMessage("Archivo cargado correctamente.");
      })
      .catch(() => {
        setMessage("Error al cargar el archivo.");
      });
  };

  // Maneja la carga de horas extras
  const handleExtraHours = () => {
    accessControlService.processExtraHours()
      .then(() => {
        setMessage("Horas extra procesadas correctamente.");
      })
      .catch(() => {
        setMessage("Error al procesar horas extra.");
      });
  };

  // Maneja la carga de descuentos
  const handleDiscounts = () => {
    accessControlService.processDiscounts()
      .then(() => {
        setMessage("Descuentos procesados correctamente.");
      })
      .catch(() => {
        setMessage("Error al procesar descuentos.");
      });
  };

  return (
    <div>
      <Typography variant="h4">Cargar Archivo de Control de Acceso Mensual</Typography>
      
      {/* Creamos un Box para separar y alinear el input y el botón */}
      <Box
        sx={{
          display: 'flex',          // Flexbox para posicionar elementos
          justifyContent: 'space-between',  // Separa los elementos en los extremos
          alignItems: 'center',     // Centra verticalmente
          marginTop: '20px'         // Espacio entre el título y los elementos
        }}
      >
        <input type="file" accept=".txt" onChange={handleFileChange} />
        <Button variant="contained" color="primary" onClick={handleFileUpload}>
          Cargar Archivo
        </Button>
      </Box>

      {/* Mensaje de alerta */}
      {message && (
        <Alert severity="info" style={{ marginTop: "20px" }}>
          {message}
        </Alert>
      )}

      {/* Botones para cargar horas extra y descuentos */}
      <div style={{ marginTop: "20px" }}>
        <Button variant="outlined" color="secondary" onClick={handleExtraHours} style={{ marginRight: "10px" }}>
          Cargar Horas Extra
        </Button>

        <Button variant="outlined" color="secondary" onClick={handleDiscounts}>
          Cargar Descuentos
        </Button>
      </div>
    </div>
  );
};

export default LoadAccessControl;
