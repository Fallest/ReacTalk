import { AppBar, Box, Toolbar } from "@mui/material";
import React from "react";
import type {FC} from 'react';
import AccountMenu from "./account-menu";

export const Navbar: FC = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static" 
        sx={{
          backgroundColor: "rgb(55, 69, 87)",
          borderBottom: "1px solid aqua",
          alignItems: "flex-end" 
        }}
      >
        <Toolbar>
          <AccountMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
};