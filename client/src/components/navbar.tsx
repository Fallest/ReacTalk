import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import type {FC} from 'react';
import AccountMenu from "./account-menu";
import { AuthContext } from "../context/authContext";
import "./animations.css"

export const Navbar: FC = () => {
  const {user} = useContext(AuthContext)

  return (
    <Box>
      <AppBar 
        position="static" 
        sx={{
          backgroundColor: "rgb(55, 69, 87)",
          borderBottom: "1px solid aqua",
          display:"flex",
          flexFlow:"row",
          alignItems: "flex-end",
          justifyItems: "center",
          height: "10vh"
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            mr: "auto",
            ml: 3,
          }}
        >
          <Typography
            variant="subtitle1"
            fontSize="30px"
          >
            {user.currentChat}
          </Typography>
        </Box>
        <AccountMenu />
      </AppBar>
    </Box>
  );
};