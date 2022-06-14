import { FC, useContext } from "react";
import React from "react";

import { Link } from "react-router-dom";

import { AuthContext } from "../context/authContext";

import { Box, Divider, Typography } from "@mui/material";

import { Logo } from "./logo";
import { ChatsTable } from "./chats-table";

/**
 * Sidebar component for the chats page.
 * Has a search bar to search for alreaddy added friends, and start chats with them.
 * Has a button to add a new friend (search uses username or email)
 * Shows all the friends with open chats.
 */
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
      <Link to="/chats" style={{ textDecoration: "none" }}>
        <Logo size={30} />
      </Link>

      <Divider flexItem sx={{ backgroundColor: "aqua" }} />

      <ChatsTable />
    </Box>
  );
};
