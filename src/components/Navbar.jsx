import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Sidemenu from "./Sidemenu";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    setOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ height: '80px' }}>
        <Toolbar sx={{ minHeight: '80px' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, fontSize: '2rem' }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon fontSize="inherit" />
          </IconButton>

          <Typography 
            variant="h5"  
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontSize: '1.8rem',
              padding: '200px', 
              margin: '10px 0', 
            }} 
          >
            MueblesStgo: Recursos Humanos
          </Typography>

          <Button color="inherit" sx={{ fontSize: '1.2rem' }}>Login</Button> 
        </Toolbar>
      </AppBar>

      <Sidemenu open={open} toggleDrawer={toggleDrawer}></Sidemenu>
    </Box>
  );
}