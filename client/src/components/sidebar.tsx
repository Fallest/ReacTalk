import { FC, useContext } from "react";
import React from "react";

import { Link } from "react-router-dom";

import { AuthContext } from "../context/authContext";

import { Container, Typography, Box, Divider } from "@mui/material";

import { Logo } from "./logo";

export const Sidebar: FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "25vw",
        backgroundColor: "rgb(55, 69, 87)",
        borderRight: "1px solid aqua",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
      }}
    >
      <Link to="/chats" style={{ textDecoration: "none", margin: "20px" }}>
        <Logo size={60} />
      </Link>

      <Divider flexItem sx={{ my: 3, backgroundColor: "aqua" }} />

      {/**
       * TODO:
       * Search bar to start new chats with friends.
       * Render all the chats the user is part of.
       */}
    </Box>
  );
};
