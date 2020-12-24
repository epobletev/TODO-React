import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

export const Navbar = () => (
  <AppBar position="static" style={{backgroundColor:"green"}}>
    <Toolbar>
      <Typography variant="h6" color="inherit">
        TCIT
      </Typography>
    </Toolbar>
  </AppBar>
);