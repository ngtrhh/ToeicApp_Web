import React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";

function Navbar() {
  return (
    <AppBar
      position="fixed"
      className="bg-body text-primary"
      sx={{
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1) !important",
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <Box sx={{ flexGrow: 1 }} />
        <div>Admin</div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
